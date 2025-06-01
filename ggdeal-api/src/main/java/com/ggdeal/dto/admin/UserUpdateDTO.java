package com.ggdeal.dto.admin;

import com.ggdeal.enums.Role;
import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserUpdateDTO {
    @NotNull(message = "El id es obligatorio")
    @Positive
    private Long id;

    @NotBlank(message = "El nombre completo es obligatorio")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String username;

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    private String email;

    private String numberPhone;
    private Role role;
    private Boolean isVerified;

}
