package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDate;
import java.util.List;


@Entity
@Builder
@ToString
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String username;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDate isUserVerified;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "user")
    private List<Sale> sales;
}
