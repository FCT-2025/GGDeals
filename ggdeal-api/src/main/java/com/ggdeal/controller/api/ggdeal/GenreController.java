package com.ggdeal.controller.api.ggdeal;

import com.ggdeal.dto.api.GenreWithCountDTO;
import com.ggdeal.repository.GenreRepostiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/ggdeal/genre")
public class GenreController {

    private final GenreRepostiory genreRepostiory;

    @Autowired
    public GenreController(GenreRepostiory genreRepostiory) {
        this.genreRepostiory = genreRepostiory;
    }

    @GetMapping
    public ResponseEntity<List<GenreWithCountDTO>> getGenres() {
        List<GenreWithCountDTO> genres = genreRepostiory.findAll().stream().map(genre ->  new GenreWithCountDTO(genre) ).collect(Collectors.toList());
        return ResponseEntity.ok(genres);
    }
}
