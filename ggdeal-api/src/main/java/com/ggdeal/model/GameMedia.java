package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class GameMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    private String path;
    private boolean isThumbnail;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;
}
