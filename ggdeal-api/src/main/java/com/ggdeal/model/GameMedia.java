package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@ToString
public class GameMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String path;
    private boolean isThumbnail;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;
}
