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
public class GameMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "The path is mandatory.")
    private String path;
    private Boolean isThumbnail;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @PrePersist
    public void prePersist() {
        if(isThumbnail==null) {
            isThumbnail = false;
        }
    }
}
