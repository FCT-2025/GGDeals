package com.ggdeal.controller.admin;

import com.ggdeal.dto.UserUpdateDTO;
import com.ggdeal.model.User;
import com.ggdeal.service.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/api/admin/users")
public class AdminUserController {
    private static final String REDIRECT_USERS = "redirect:/api/admin/users";
    private static final String USERS_VIEW = "admin/users";

    private final UserService userService;

    @Autowired
    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getUsersDashboard(Model model) {

        List<User> users = userService.findAll();
        model.addAttribute("users", users);

        return USERS_VIEW;
    }

    @PostMapping
    public String createUser(
            @Valid User user,
            @RequestParam(value = "avatarFile", required = false) MultipartFile avatarFile,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes) {

        validateUser(user, bindingResult);

        if (bindingResult.hasErrors()) {
            addBindingErrorsToRedirect(redirectAttributes, bindingResult);
            return REDIRECT_USERS;
        }

        return processUserCreation(user, avatarFile, redirectAttributes);
    }

    @PostMapping("/update")
    public String updateUser(
            @Valid UserUpdateDTO userUpdate,
            @RequestParam(value = "avatarFile", required = false) MultipartFile avatarFile,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes) {

        User existingUser = userService.findById(userUpdate.getId());
        validateUserUpdate(userUpdate, existingUser, bindingResult);

        if (bindingResult.hasErrors()) {
            addBindingErrorsToRedirect(redirectAttributes, bindingResult);
            return REDIRECT_USERS;
        }

        return processUserUpdate(existingUser, userUpdate, avatarFile, redirectAttributes);
    }

    @PostMapping("/delete/{id}")
    public String deleteUser(
            @PathVariable Long id,
            RedirectAttributes redirectAttributes) {

        try {
            userService.delete(id);
            redirectAttributes.addFlashAttribute("success", "Usuario eliminado exitosamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al eliminar usuario: " + e.getMessage());
        }

        return REDIRECT_USERS;
    }

    // Helper methods
    private void addPaginationAttributes(Model model, Page<User> userPage, int page, int size) {
        model.addAttribute("users", userPage.getContent());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", userPage.getTotalPages());
        model.addAttribute("pageSize", size);
    }

    private void validateUser(User user, BindingResult bindingResult) {
        if(user.getNumberPhone().isBlank()) {
            user.setNumberPhone(null);
        }

        if (user.getNumberPhone() != null && !user.getNumberPhone().matches("^[0-9]{9}$")) {
            bindingResult.rejectValue("numberPhone", "numberPhone.invalid",
                    "El número de teléfono debe tener exactamente 9 dígitos");
        }


        if (userService.existsByEmail(user.getEmail())) {
            bindingResult.rejectValue("email", "error.user",
                    "Ya existe una cuenta registrada con este correo.");
        }

        if (userService.existsByUsername(user.getUsername())) {
            bindingResult.rejectValue("username", "error.user",
                    "El nombre de usuario ya está en uso.");
        }
    }

    private void validateUserUpdate(UserUpdateDTO userUpdate, User existingUser, BindingResult bindingResult) {
        if (existingUser == null) {
            bindingResult.reject("error.user", "No se encuentra el usuario.");
            return;
        }

        if(userUpdate.getNumberPhone().isBlank()) {
            userUpdate.setNumberPhone(null);
        }

        if (userUpdate.getNumberPhone() != null && !userUpdate.getNumberPhone().matches("^[0-9]{9}$")) {
            bindingResult.rejectValue("numberPhone", "numberPhone.invalid",
                    "El número de teléfono debe tener exactamente 9 dígitos");
        }

        if (!userUpdate.getEmail().equals(existingUser.getEmail()) &&
                userService.existsByEmail(userUpdate.getEmail())) {
            bindingResult.rejectValue("email", "error.user",
                    "Ya existe una cuenta registrada con este correo.");
        }

        if (!userUpdate.getUsername().equals(existingUser.getUsername()) &&
                userService.existsByUsername(userUpdate.getUsername())) {
            bindingResult.rejectValue("username", "error.user",
                    "El nombre de usuario ya está en uso.");
        }
    }

    private String processUserCreation(User user, MultipartFile avatarFile,
                                       RedirectAttributes redirectAttributes) {
        try {
            userService.save(user, avatarFile);
            redirectAttributes.addFlashAttribute("success", "Usuario creado exitosamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error",
                    "Error al crear usuario: " + e.getMessage());
        }
        return REDIRECT_USERS;
    }

    private String processUserUpdate(User existingUser, UserUpdateDTO userUpdate,
                                     MultipartFile avatarFile, RedirectAttributes redirectAttributes) {
        updateUserFields(existingUser, userUpdate);

        try {
            userService.update(existingUser, avatarFile);
            redirectAttributes.addFlashAttribute("success", "Usuario actualizado exitosamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error",
                    "Error al actualizar usuario: " + e.getMessage());
        }
        return REDIRECT_USERS;
    }

    private void updateUserFields(User user, UserUpdateDTO userUpdate) {
        user.setUsername(userUpdate.getUsername());
        user.setEmail(userUpdate.getEmail());
        user.setRole(userUpdate.getRole());
        user.setNumberPhone(userUpdate.getNumberPhone());
        user.setIsVerified(userUpdate.getIsVerified());
    }

    private void addBindingErrorsToRedirect(RedirectAttributes redirectAttributes,
                                            BindingResult bindingResult) {
        redirectAttributes.addFlashAttribute("errorBinding", bindingResult);
    }
}