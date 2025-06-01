package com.ggdeal.controller.admin;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.http.HttpResponse;


@Controller
public class CustomErrorController implements ErrorController {
    @RequestMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        Integer statusCode = (Integer) request.getAttribute("jakarta.servlet.error.status_code");
        model.addAttribute("statusCode", statusCode);
        if (statusCode == 404) {
            model.addAttribute("title", "NO ENCONTRADO");
            model.addAttribute("description", "La página que estás buscando no existe.");
        } else if (statusCode == 500) {
            model.addAttribute("title", "ERROR INTERNO DEL SERVIDOR");
            model.addAttribute("description", "Ha ocurrido un error inesperado en el servidor.");
        } else if (statusCode == 403) {
            model.addAttribute("title", "ACCESO DENEGADO");
            model.addAttribute("description", "No tienes permisos para acceder a esta página.");
        } else {
            model.addAttribute("title", "ERROR");
            model.addAttribute("description", "Ha ocurrido un error inesperado.");
        }


        return "admin/error";
    }
}
