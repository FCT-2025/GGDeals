package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    private String name;
    private String feature;
    private Double price;

    @OneToMany(mappedBy = "edition")
    private List<Replica> replica;

    @ManyToMany(mappedBy = "editions")
    private List<Game> games;


}
