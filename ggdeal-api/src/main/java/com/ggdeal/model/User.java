package com.ggdeal.model;

import com.ggdeal.validation.UniqueEmail;
import com.ggdeal.validation.UniqueUsername;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "Email is mandatory")
    @Column(nullable = false, unique = true)
    @Email(message = "Email format is invalid")
    @Size(max = 100, message = "Email must be less than 100 characters")
    @UniqueEmail
    private String email;
    
    @NotBlank(message = "Name is mandatory")
    @Column(nullable = false, unique = true)
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @UniqueUsername
    private String username;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 3, message = "Password must be unless 5 characters")
    @Size(max = 200, message = "Password must'n overpass 200 characteres")
    private String password;

    @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "The number phone is invalid")
    private String numberPhone;

    private String avatarPath;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDate created_at;

    @Column(nullable = true)
    private LocalDate isUserVerified;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "user")
    private List<Sale> sales;

    @PrePersist
    public void prePersist() {
        if(role==null) {
            role = Role.USER;
        }
        if(created_at==null) {
            created_at = LocalDate.now();
        }
    }
}
