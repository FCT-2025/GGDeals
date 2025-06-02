package com.ggdeal.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.model.Replica;
import com.ggdeal.model.User;
import com.ggdeal.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin")
@Controller
public class AdminController {

    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final SaleRepository salesRepostiory;
    private final ReservationRepository reservationRepository;
    private final PlatformTypeRepository platformTypeRepository;
    private final JwtProvider jwtProvider;
    private final BCryptPasswordEncoder passwordEncoder;

    private final String LOGIN_VIEW = "admin/login";
    private final String REGISTER_VIEW = "admin/register";
    private final String ADMIN_DASHBOARD_VIEW = "admin/dashboard";

    private final String ADMIN_DASHBOARD_REDIRECT = "redirect:/api/admin";

    @Autowired
    public AdminController(BCryptPasswordEncoder passwordEncoder, JwtProvider jwtProvider,
                           PlatformTypeRepository platformTypeRepository,
                           ReservationRepository reservationRepository,
                           SaleRepository salesRepostiory,
                           GameRepository gameRepository,
                           UserRepository userRepository,
                           ReplicaRepository replicaRepository) {
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.platformTypeRepository = platformTypeRepository;
        this.reservationRepository = reservationRepository;
        this.salesRepostiory = salesRepostiory;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }


    @GetMapping("")
    public String adminDashboard(Model model) throws JsonProcessingException {
        model.addAttribute("countUsers", userRepository.count());
        model.addAttribute("countGames", gameRepository.count());
        model.addAttribute("countSales", salesRepostiory.count());
        model.addAttribute("countReservation", reservationRepository.count());
        model.addAttribute("lastSales", salesRepostiory.findTop5ByOrderByPurchaseDateDesc());
        model.addAttribute("popularSales", salesRepostiory.findTop5PopularGames());
        model.addAttribute("popularPlatform", platformTypeRepository.findWithDistributionOfReplica());
        model.addAttribute("salesPerMonth", salesRepostiory.findNumberSalesPerMonth());

        return ADMIN_DASHBOARD_VIEW;
    }

    @GetMapping("/login")
    public String login(Model model) throws JsonProcessingException {
        return LOGIN_VIEW;
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("user", new User());
        return REGISTER_VIEW;
    }

    @PostMapping("/login")
    public String login(@RequestParam String emailUsername, @RequestParam String password, HttpServletResponse response, Model model) {
        User userByEmail = userRepository.findByEmail(emailUsername).get();
        User user =  null;

        if(userByEmail != null) {
            user = userByEmail;
        }

        if(user == null) {
            user = userRepository.findByUsername(emailUsername).orElse(null);
        }

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            model.addAttribute("error", "Usuario o contraseña incorrectos");
            return LOGIN_VIEW;
        }

        jwtProvider.setTokenCookie(response, user.getId());

        return ADMIN_DASHBOARD_REDIRECT;
    }

    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("user") User user, BindingResult bindingResult, HttpServletResponse response, Model model) {
        if(userRepository.existsByUsername(user.getUsername())) {
            bindingResult.rejectValue("username", "error.username", "El usuario ya existe");
        }

        if(userRepository.existsByEmail(user.getEmail())) {
            bindingResult.rejectValue("email", "error.email", "El email ya existe");
        }

        if(bindingResult.hasErrors()) {
            model.addAttribute("error", bindingResult);
            return REGISTER_VIEW;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user  = userRepository.save(user);

        jwtProvider.setTokenCookie(response, user.getId());

        return ADMIN_DASHBOARD_REDIRECT;
    }

    @GetMapping("/logout")
    public String logout(HttpServletResponse response) {
        jwtProvider.deleteTokenCookie(response);
        return "redirect:/api/admin/login";
    }
}