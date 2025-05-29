package com.ggdeal.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.model.Replica;
import com.ggdeal.model.User;
import com.ggdeal.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    private final ReplicaRepository replicaRepository;

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
        this.replicaRepository = replicaRepository;
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

        return "admin/dashboard";
    }

    @GetMapping("/login")
    public String login(Model model) throws JsonProcessingException {
        return "admin/login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String emailUsername, @RequestParam String password, HttpServletResponse response, Model model) {
        User userByEmail = userRepository.findByEmail(emailUsername);
        User user =  null;

        if(userByEmail != null) {
            user = userByEmail;
        }

        if(user == null) {
            user = userRepository.findByUsername(emailUsername);
        }

        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            model.addAttribute("error", "Usuario o contraseña incorrectos");
            return "admin/login";
        }

        jwtProvider.setTokenCookie(response, user.getId());

        return "redirect:/api/admin";
    }

    @GetMapping("/logout")
    public String logout(HttpServletResponse response) {
        jwtProvider.deleteTokenCookie(response);
        return "redirect:/api/admin/login";
    }

    public List<Replica> findAvailableReplicas() {
        return replicaRepository.findByIsSold(false);
    }
}