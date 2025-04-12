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
public class Plataform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String plataform;

    @OneToMany(mappedBy = "plataform")
    private List<Replica> replicas;

    @ManyToMany(mappedBy = "plataforms")
    private List<Game> game;

}
