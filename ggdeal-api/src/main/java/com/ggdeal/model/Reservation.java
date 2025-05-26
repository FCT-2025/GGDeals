package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Enumerated(EnumType.STRING)
    private ReservationStatus status;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
