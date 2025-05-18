package com.ggdeal.controller.admin;

import com.ggdeal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/admin")
    public String adminDashboard(Model model) {
        Long countUsers = userRepository.count();
        model.addAttribute("countUsers", countUsers);

        return "admin"; // Esto hará referencia a admin.html en /templates
    }

}