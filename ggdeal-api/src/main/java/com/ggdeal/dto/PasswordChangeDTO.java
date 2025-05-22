package com.ggdeal.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordChangeDTO {
    @NotBlank(message = "La contraseña actual es obligatoria")
    @Size(min = 5, message = "La contraseña debe tener al menos 5 caracteres")
    @Size(max = 200, message = "La contraseña no puede exceder los 200 caracteres")
    private String password;

    @NotBlank(message = "La nueva contraseña es obligatoria")
    @Size(min = 5, message = "La nueva contraseña debe tener al menos 5 caracteres")
    @Size(max = 200, message = "La nueva contraseña no puede exceder los 200 caracteres")
    private String newPassword;

    @NotBlank(message = "La confirmación de contraseña es obligatoria")
    private String confirmPassword;
}