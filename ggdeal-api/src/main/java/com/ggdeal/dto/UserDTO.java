package com.ggdeal.dto;


import com.ggdeal.model.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;


@Builder
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String email;
    private String username;
    private String numberPhone;
    private String avatarPath;
    private Role role;
    private LocalDate created_at;
    private Boolean isVerified;
}
