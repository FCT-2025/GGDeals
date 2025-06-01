package com.ggdeal.model;

import com.ggdeal.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
    private String email;
    
    @NotBlank(message = "Name is mandatory")
    @Column(nullable = false, unique = true)
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 4, message = "Password must be unless 5 characters")
    @Size(max = 200, message = "Password must'n overpass 200 characteres")
    private String password;

    private String numberPhone;

    private String avatarPath;

    @NotNull
    @Past(message = "La fecha de nacimiento debe ser una fecha pasada")
    private LocalDate birthdate;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDate createdAt;

    private Float amount;

    @Column(nullable = true)
    private Boolean isVerified;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "user")
    private List<Sale> sales;

    @PrePersist
    public void prePersist() {
        if(role==null) {
            role = Role.USER;
        }
        if(createdAt==null) {
            createdAt = LocalDate.now();
        }

        this.amount = 0f;
    }

    public Float updateBalance(Float amount) {
        this.amount += amount;
        return this.amount;
    }
}
