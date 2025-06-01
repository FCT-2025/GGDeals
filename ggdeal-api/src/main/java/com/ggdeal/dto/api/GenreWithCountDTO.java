package com.ggdeal.dto.api;


import com.ggdeal.model.Genre;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenreWithCountDTO {
    private Long id;
    private String name;
    private int gameCount;

    public GenreWithCountDTO(Genre genre) {
        this.id = genre.getId();
        this.name = genre.getName();
        this.gameCount = genre.getGames().size();
    }

}
