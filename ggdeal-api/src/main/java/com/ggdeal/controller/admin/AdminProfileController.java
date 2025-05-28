package com.ggdeal.controller.admin;

import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.dto.PasswordChangeDTO;
import com.ggdeal.dto.UserDTO;
import com.ggdeal.dto.UserProfileDTO;
import com.ggdeal.model.User;
import com.ggdeal.repository.UserRepository;
import com.ggdeal.service.storage.StorageService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;


@RequestMapping("/api/admin")
@Controller
public class AdminProfileController {

    private static final String REDIRECT_PROFILE = "redirect:/api/admin/profile";
    private static final String PROFILE_VIEW = "admin/profile";

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final StorageService storageService;

    @Autowired
    public AdminProfileController(StorageService storageService, JwtProvider jwtProvider , BCryptPasswordEncoder passwordEncoder) {
        this.storageService = storageService;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("/profile")
    public String profile(Model model) {
        UserDTO user = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", user);
        model.addAttribute("passwordChangeDTO", new PasswordChangeDTO());
        return PROFILE_VIEW;
    }

    @PostMapping("/profile/save")
    public String profileSave(
            @Valid @ModelAttribute("userProfileDTO") UserProfileDTO userDTO,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            HttpServletResponse response) {

        if(userDTO.getNumberPhone().isBlank()) {
            userDTO.setNumberPhone(null);
        }
        if(userDTO.getNumberPhone() != null &&  !userDTO.getNumberPhone().matches("^[0-9]{9}$")) {
            bindingResult.rejectValue("numberPhone", "numberPhone.invalid", "El número debe tener exactamente 9 dígitos");
        }

        UserDTO user = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User userSearched = userRepository.findById(user.getId()).get();

        if(userSearched == null) {
            return REDIRECT_PROFILE;
        }

        if(!userSearched.getEmail().equals(userDTO.getEmail()) && userRepository.existsByEmail(userDTO.getEmail())) {
            bindingResult.rejectValue("email", "error.user", "Ya existe una cuenta registrada con este correo.");
        }

        if(!userSearched.getUsername().equals(userDTO.getUsername()) && userRepository.existsByUsername(userDTO.getUsername())) {
            bindingResult.rejectValue("username", "error.user", "El nombre de usuario ya está en uso.");
        }

        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("messageBindingResultSave", bindingResult);
            return REDIRECT_PROFILE;
        }

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
                return REDIRECT_PROFILE;
            }
        }
        try {
            userRepository.save(userSearched);
        }catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error al guardar el usuario: " + e.getMessage());
        }

        jwtProvider.setTokenCookie(response, userSearched.getId());
        redirectAttributes.addFlashAttribute("successMessageSave", "Perfil actualizado correctamente");
        return REDIRECT_PROFILE;
    }


    @PostMapping("/profile/change-password")
    public String profileChangePassword(
            @Valid @ModelAttribute("passwordChangeDTO") PasswordChangeDTO passwordChangeDTO,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes) {
        UserDTO user = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userSearched = userRepository.findById(user.getId()).orElse(null);

        if (bindingResult.hasErrors()) {
            redirectAttributes.addFlashAttribute("messageBindingResultPassword", bindingResult);
            return REDIRECT_PROFILE;
        }

        if(passwordChangeDTO.getConfirmPassword() != passwordChangeDTO.getNewPassword()) {
            redirectAttributes.addFlashAttribute("errorConfirm", "Las contraseñas no coinciden");
            return REDIRECT_PROFILE;
        }

        if (userSearched == null) {
            redirectAttributes.addFlashAttribute("errorMessageGlobal", "Usuario no encontrado");
            return REDIRECT_PROFILE;
        }

        if (!passwordEncoder.matches(passwordChangeDTO.getPassword(), userSearched.getPassword())) {
            redirectAttributes.addFlashAttribute("errorPassword", "La contraseña actual es incorrecta");
            return REDIRECT_PROFILE;
        }


        String encodedPassword = passwordEncoder.encode(passwordChangeDTO.getNewPassword());
        userSearched.setPassword(encodedPassword);

        try {
            userRepository.save(userSearched);
            redirectAttributes.addFlashAttribute("successMessage", "Contraseña cambiada correctamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error al guardar la contraseña: " + e.getMessage());
        }

        return REDIRECT_PROFILE;
    }
}
