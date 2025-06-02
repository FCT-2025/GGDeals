package com.ggdeal.dto.api;

import com.ggdeal.enums.GameAvailabilityType;
import com.ggdeal.model.*;
import lombok.Data;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Data
public class GameDTO {
    private Long id;
    private String title;
    private Float prize;
    private Integer discount;
    private String src;
    private String nameSlug;
    private Set<PlatformModel> platformModels;
    private GameAvailabilityType type;
    private List<Replica> replicas;
    private List<GameMedia> gameMedias;
    private List<Feature> features;
    private List<Edition> editions;
    private Genre genre;
    private String development;
    private String description;
    private LocalDate releaseDate;


    public GameDTO(Game game, String mediaUrlBase) {
        this.id = game.getId();
        this.title = game.getTitle();
        this.prize = game.getPrice();
        this.nameSlug = game.getNameSlug();
        this.replicas = game.getReplicas().stream().filter(replicas -> Boolean.FALSE.equals(replicas.getIsSold())).toList();
        Set<PlatformModel> platforms = this.replicas.stream()
                .map(Replica::getPlatformModel)
                .collect(Collectors.toSet());

        platforms.forEach((platform) -> {
            String path = null;
            if (platform.getPathLogo() != null) {
                path = URI.create(mediaUrlBase).resolve(platform.getPathLogo()).toString();
            }
            platform.setPathLogo(path);
        });

        this.gameMedias =  game.getGameMedias().stream().map(gameMedia -> {
            String path = null;
            if (gameMedia.getPath() != null) {
                path = URI.create(mediaUrlBase).resolve(gameMedia.getPath()).toString();
            }
            gameMedia.setPath(path);
            return gameMedia;
        }).toList();

        this.releaseDate = game.getReleaseDate();
        this.description = game.getDescription();
        this.development = game.getDevelopment();
        this.genre = game.getGenre();
        this.features = game.getFeatures();
        this.editions = game.getEditions();
        this.platformModels = platforms;
        this.discount = null;

        String path = game.getGameMedias().stream()
                .filter(GameMedia::getIsThumbnail)
                .map(GameMedia::getPath)
                .findFirst()
                .orElse(null);

        if (path != null) {
            path = URI.create(mediaUrlBase).resolve(path).toString();
        }

        this.src = path;
        this.type = game.isPreOrder() ? GameAvailabilityType.PREORDER : GameAvailabilityType.AVAILABLE;
    }


    public GameDTO(Game game) {
        this.id = game.getId();
        this.title = game.getTitle();
        this.nameSlug = game.getNameSlug();
        this.prize = game.getPrice();
        this.discount = game.getDiscount();
    }
}
