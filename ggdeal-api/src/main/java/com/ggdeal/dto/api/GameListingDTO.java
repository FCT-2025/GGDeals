package com.ggdeal.dto.api;

import com.ggdeal.enums.GameAvailabilityType;
import com.ggdeal.model.Game;
import com.ggdeal.model.GameMedia;
import com.ggdeal.model.PlatformModel;
import com.ggdeal.model.Replica;
import lombok.Getter;
import lombok.Setter;

import java.net.URI;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class GameListingDTO {

    private Long id;
    private String title;
    private Float prize;
    private Integer discount;
    private String src;
    private String nameSlug;
    private Set<PlatformModel> platformModels;
    private GameAvailabilityType type;


    public GameListingDTO(Game game, String mediaUrlBase) {
        this.id = game.getId();
        this.title = game.getTitle();
        this.prize = game.getPrice();
        this.nameSlug = game.getNameSlug();
        Set<PlatformModel> platforms = game.getReplicas().stream()
                .map(Replica::getPlatformModel)
                .collect(Collectors.toSet());
        platforms.forEach((platform) -> {
            String path = null;
            if (platform.getPathLogo() != null) {
                path = URI.create(mediaUrlBase).resolve(platform.getPathLogo()).toString();
            }
            platform.setPathLogo(path);
        });

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
}