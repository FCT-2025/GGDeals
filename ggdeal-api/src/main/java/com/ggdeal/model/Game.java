package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String title;
    private String development;
    private LocalDate releaseDate;
    private LocalDateTime isPublished;

    @OneToMany(mappedBy = "game")
    private List<Reservation> reservations;

    @OneToMany(mappedBy = "game")
    private List<GameMedia> gameMedias;

    @ManyToMany
    @JoinTable(
            name = "aux_game_feature",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private List<Feature> features;

    @ManyToMany
    @JoinTable(
            name = "aux_game_plataform",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "plataform_id")
    )
    private List<Plataform> plataforms;

    @ManyToMany
    @JoinTable(
            name = "aux_game_edition",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "edition_id")
    )
    private List<Edition> editions;

}
