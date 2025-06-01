package com.ggdeal.dto.admin;


import com.ggdeal.enums.Role;
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
    private LocalDate birthdate;
    private LocalDate createdAt;
    private Boolean isVerified;
}
