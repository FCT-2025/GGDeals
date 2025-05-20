package com.ggdeal.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggdeal.dto.DistributionPlataformDTO;
import com.ggdeal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

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
    private PlataformTypeRepository plataformTypeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @GetMapping("/api/admin")
    public String adminDashboard(Model model) throws JsonProcessingException {
        model.addAttribute("countUsers", userRepository.count());
        model.addAttribute("countGames", gameRepository.count());
        model.addAttribute("countSales", salesRepostiory.count());
        model.addAttribute("countReservation", reservationRepository.count());
        model.addAttribute("lastSales", salesRepostiory.findTop5ByOrderByPurcharseDateDesc());
        model.addAttribute("popularSales", salesRepostiory.findTop5PopularGames());
        model.addAttribute("popularPlatform", plataformTypeRepository.findWithDistributionOfReplica());
        model.addAttribute("salesPerMonth", salesRepostiory.findNumberSalesPerMonth());

        return "admin";
    }

}