package com.ggdeal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @NotBlank(message = "La clave de activacion es obligatoria")
    private String activationKey;

    private Boolean isSold;

    @ManyToOne
    @JoinColumn(name = "game_id")
    @JsonBackReference
    private Game game;

    @ManyToOne
    @JoinColumn(name = "edition_id")
    private Edition edition;

    @ManyToOne
    @JoinColumn(name = "platform_model_id")
    @JsonIgnore
    private PlatformModel platformModel;


    @OneToOne(mappedBy = "replica")
    @JsonIgnore
    private Sale sale;

    @PrePersist
    public void prePersist() {
        if (this.isSold == null) {
            this.isSold = false;
        }
    }
}
