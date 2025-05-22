package com.ggdeal.dto;


import com.ggdeal.validation.UniqueEmail;
import com.ggdeal.validation.UniqueUsername;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
public class UserProfileDTO {

    @NotBlank(message = "El nombre completo es obligatorio")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String username;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    private String email;

    @Pattern(regexp = "^[0-9]{9}$", message = "El número debe tener exactamente 9 dígitos")
    private String numberPhone;

    private MultipartFile avatarPath;
}