package com.ggdeal.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.dto.PasswordChangeDTO;
import com.ggdeal.dto.UserProfileDTO;
import com.ggdeal.model.User;
import com.ggdeal.repository.*;
import com.ggdeal.service.StorageService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;



@RequestMapping("/api/admin")
@Controller
public class AdminController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private SaleRepository salesRepostiory;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private PlatformTypeRepository platformTypeRepository;


    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private final StorageService storageService;

    @Autowired
    public AdminController(StorageService storageService) {
        this.storageService = storageService;
    }



    @GetMapping("")
    public String adminDashboard(Model model) throws JsonProcessingException {
        model.addAttribute("countUsers", userRepository.count());
        model.addAttribute("countGames", gameRepository.count());
        model.addAttribute("countSales", salesRepostiory.count());
        model.addAttribute("countReservation", reservationRepository.count());
        model.addAttribute("lastSales", salesRepostiory.findTop5ByOrderByPurcharseDateDesc());
        model.addAttribute("popularSales", salesRepostiory.findTop5PopularGames());
        model.addAttribute("popularPlatform", platformTypeRepository.findWithDistributionOfReplica());
        model.addAttribute("salesPerMonth", salesRepostiory.findNumberSalesPerMonth());

        return "admin/dashboard";
    }

    @GetMapping("/login")
    public String login(Model model) throws JsonProcessingException {
        return "admin/login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String emailUsername, @RequestParam String password, HttpServletResponse response, Model model) {
        User user = userRepository.findByEmail(emailUsername);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            model.addAttribute("error", "Usuario o contraseña incorrectos");
            return "admin/login";
        }

        jwtProvider.setTokenCookie(response, jwtProvider.generateToken(user));

        return "redirect:/api/admin";
    }

    @GetMapping ("/logout")
    public String logout(HttpServletResponse response) {
        jwtProvider.deleteTokenCookie(response);
        return "redirect:/api/admin/login";
    }

    @GetMapping("/profile")
    public String profile(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        model.addAttribute("passwordChangeDTO", new PasswordChangeDTO());
        return "admin/profile";
    }

    @PostMapping("/profile/save")
    public String profileSave(
            @Valid @ModelAttribute("userProfileDTO") UserProfileDTO userDTO,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            HttpServletResponse response) {

        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("messageBindingResultSave", bindingResult);
            return "redirect:/api/admin/profile";
        }

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userSearched = userRepository.findById(user.getId())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));


        userSearched.setUsername(userDTO.getUsername());
        userSearched.setEmail(userDTO.getEmail());
        userSearched.setNumberPhone(userDTO.getNumberPhone());

        MultipartFile avatarFile = userDTO.getAvatarPath();
        if (avatarFile != null && !avatarFile.isEmpty()) {
            try {
                String newAvatarPath = storageService.storeAvatar(
                        userDTO.getAvatarPath(),
                        userSearched.getAvatarPath()
                );

                if (newAvatarPath != null) {
                    userSearched.setAvatarPath(newAvatarPath);
                }
            } catch (IOException e) {
                redirectAttributes.addFlashAttribute("errorAvatar", "Error al guardar la imagen: " + e.getMessage());
                return "redirect:/api/admin/profile";
            }
        }

        userRepository.save(userSearched);
        jwtProvider.setTokenCookie(response, jwtProvider.generateToken(userSearched));
        redirectAttributes.addFlashAttribute("successMessageSave", "Perfil actualizado correctamente");
        return "redirect:/api/admin/profile";
    }





    @PostMapping("/profile/change-password")
    public String profileChangePassword(
            @Valid @ModelAttribute("passwordChangeDTO") PasswordChangeDTO passwordChangeDTO,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userSearched = userRepository.findById(user.getId()).orElse(null);

        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("messageBindingResultPassword", bindingResult);
            return "redirect:/api/admin/profile";
        }

        if(passwordChangeDTO.getConfirmPassword() != passwordChangeDTO.getNewPassword()) {
            redirectAttributes.addFlashAttribute("errorConfirm", "Las contraseñas no coinciden");
            return "redirect:/api/admin/profile";
        }

        if (userSearched == null) {
            redirectAttributes.addFlashAttribute("errorMessageGlobal", "Usuario no encontrado");
            return "redirect:/api/admin/profile";
        }

        if (!passwordEncoder.matches(passwordChangeDTO.getPassword(), userSearched.getPassword())) {
            redirectAttributes.addFlashAttribute("errorPassword", "La contraseña actual es incorrecta");
            return "redirect:/api/admin/profile";
        }


        String encodedPassword = passwordEncoder.encode(passwordChangeDTO.getNewPassword());
        userSearched.setPassword(encodedPassword);

        try {
            userRepository.save(userSearched);
            redirectAttributes.addFlashAttribute("successMessage", "Contraseña cambiada correctamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error al guardar la contraseña: " + e.getMessage());
        }

        return "redirect:/api/admin/profile";
    }


    @GetMapping("/404")
    public String error404() {
        return "admin/404";
    }
}