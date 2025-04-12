package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
public class Replica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String activation_key;
    private boolean is_sold;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "edition_id")
    private Edition edition;

    @ManyToOne
    @JoinColumn(name = "plataform_id")
    private Plataform plataform;


    @OneToOne(mappedBy = "replica")
    private Sale sale;
}
