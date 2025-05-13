package com.ggdeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Plataform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "Plataform is mandatory.")
    private String plataform;

    @OneToMany(mappedBy = "plataform")
    private List<Replica> replicas;

    @ManyToMany(mappedBy = "plataforms")
    private List<Game> game;

}
