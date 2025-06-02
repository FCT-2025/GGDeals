package com.ggdeal.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ggdeal.model.util.ModelUtils;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    private String nameSlug;

    @NotNull(message = "The game title is required.")
    @Size(min = 3, max = 100, message = "The game title must be between 3 and 100 characters.")
    @Column(unique = true)
    private String title;

    @NotNull(message = "The developer name is required.")
    private String development;
        
    private LocalDate releaseDate;

    private LocalDate publishedDate;

    @NotNull(message = "The game description is required.")
    @Size(min = 10, max = 500, message = "The game description must be between 10 and 500 characters.")
    private String description;

    private Float price;


    @ManyToOne
    @JoinColumn(name = "genre_id")
    @JsonIgnore
    private Genre genre;


    @ManyToMany
    @JoinTable(
            name = "aux_game_feature",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "feature_id")
    )
    private List<Feature> features;

    @ManyToMany
    @JoinTable(
            name = "aux_game_edition",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "edition_id")
    )
    private List<Edition> editions;

    @OneToMany(mappedBy = "game")
    private List<Reservation> reservations;

    private Integer discount;

    @OneToMany(mappedBy = "game", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<GameMedia> gameMedias;

    @OneToMany(mappedBy = "game")
    @JsonManagedReference
    private List<Replica> replicas;

    @PrePersist
    public void prePersist() {
        if (this.publishedDate == null) {
            this.publishedDate = LocalDate.now();
        }
        if(this.releaseDate == null) {
            this.releaseDate = LocalDate.now();
        }

        if(this.features == null) {
            this.features =  new ArrayList<>();
        }

        this.nameSlug = ModelUtils.parseSlug(getTitle());
    }

    @PreUpdate
    public void preUpdate() {
        this.nameSlug = ModelUtils.parseSlug(getTitle());
    }

    public boolean isPublished() {
        return this.publishedDate != null && !this.publishedDate.isAfter(LocalDate.now());
    }

    public List<Long> getListIdFeatures() {
        return getFeatures().stream().map(feature -> feature.getId()).toList();
    }

    public Boolean isPreOrder() {
        return LocalDate.now().isBefore(publishedDate);
    }
}
