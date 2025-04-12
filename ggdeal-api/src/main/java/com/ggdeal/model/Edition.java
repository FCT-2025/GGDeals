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
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String feature;
    private Double price;

    @OneToMany(mappedBy = "edition")
    private List<Replica> replica;

    @ManyToMany(mappedBy = "editions")
    private List<Game> games;
}
