package com.ggdeal.model;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PlatformType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;
    private String pathLogo;


    @OneToMany(mappedBy = "plataform")
    private List<Replica> replicas;

    @ManyToMany(mappedBy = "plataforms")
    private List<Game> games;

}
