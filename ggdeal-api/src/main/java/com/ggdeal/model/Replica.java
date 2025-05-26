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

    @Column(name = "is_sold")
    private Boolean isSold;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "edition_id")
    private Edition edition;

    @ManyToOne
    @JoinColumn(name = "platform_type")
    private PlatformType platformType;

    @ManyToOne
    @JoinColumn(name = "platform_model")
    private PlatformModel platformModel;

    @Column(name = "platform_id", nullable = false)
    private Long platformId;

    @OneToOne(mappedBy = "replica")
    private Sale sale;

    @PrePersist
    public void prePersist() {
        if (this.isSold == null) {
            this.isSold = false;
        }
    }
}
