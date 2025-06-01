package com.ggdeal.dto.api;

import com.ggdeal.dto.admin.UserDTO;
import com.ggdeal.enums.Role;
import lombok.Getter;
import lombok.Setter;

import java.net.URI;
import java.time.LocalDate;

@Getter
@Setter
public class UserApiDTO {
    private Long id;
    private String email;
    private String username;
    private String numberPhone;
    private String avatarPath;
    private Role role;
    private LocalDate birthdate;
    private LocalDate createdAt;
    private Boolean isVerified;


    public UserApiDTO(UserDTO user, String mediaUrlBase) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.numberPhone = user.getNumberPhone();
        this.role = user.getRole();
        this.birthdate = user.getBirthdate();
        this.createdAt = user.getCreatedAt();
        this.isVerified = user.getIsVerified();

        String path = null;
        if (user.getAvatarPath() != null) {
            path = URI.create(mediaUrlBase).resolve(user.getAvatarPath()).toString();
        }
        this.avatarPath = path;
    }
}
