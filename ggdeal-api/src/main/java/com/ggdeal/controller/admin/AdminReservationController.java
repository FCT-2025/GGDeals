package com.ggdeal.controller.admin;

import com.ggdeal.model.Reservation;
import com.ggdeal.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/admin/reservations")
public class AdminReservationController {

    private static final String REDIRECT_USERS = "redirect:/api/admin/users";
    private static final String RESERVATIONS_VIEW = "admin/reservations";
    private static final int DEFAULT_PAGE_SIZE = 5;

    private final ReservationService reservationService;

    @Autowired
    public AdminReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public String getReservationsDashboard(Model model) {
        model.addAttribute("reservationStats", reservationService.getReservationStats());
        return RESERVATIONS_VIEW;
    }

}
