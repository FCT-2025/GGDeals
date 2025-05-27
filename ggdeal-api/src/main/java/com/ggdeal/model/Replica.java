package com.ggdeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Replica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "The activation key is Mandatory")
    private String activation_key;

    private Boolean isSold;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "edition_id")
    private Edition edition;

    @ManyToOne
    @JoinColumn(name = "plataform_id")
    private PlatformType plataform;


    @OneToOne(mappedBy = "replica")
    private Sale sale;

    @PrePersist
    public void prePersist() {
        if (this.isSold == null) {
            this.isSold = false;
        }
    }
}
