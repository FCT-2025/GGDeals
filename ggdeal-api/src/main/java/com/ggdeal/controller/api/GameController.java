package com.ggdeal.controller.api;

import com.ggdeal.exception.ErrorResponseDTO;
import com.ggdeal.model.Game;
import com.ggdeal.repository.GameRepository;
import com.ggdeal.specification.GameSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ggdeal")
public class GameController {
    @Autowired
    private GameRepository gameRepository;

    @GetMapping("/game")
    private ResponseEntity<List<Game>> getGames(@RequestParam(required = false) Long id,
                                                @RequestParam(required = false) String title,
                                                @RequestParam(required = false) String genre,
                                                @RequestParam(required = false) Integer releasedLastDays,
                                                @RequestParam(required = false) Boolean isPublished) {
        List<Game> games = gameRepository.findAll(
                GameSpecification.filterBy(id, title, genre, releasedLastDays, isPublished)
        );
        return ResponseEntity.ok(games);
    }

    @GetMapping("/game/{id}")
    private ResponseEntity<Object> getGame(@PathVariable Long id) {
        Optional<Game> game = gameRepository.findById(id);

        if (game.isPresent()) {
            return ResponseEntity.ok(game.get());
        } else {
            ErrorResponseDTO errorResponse = ErrorResponseDTO.builder().status(HttpStatus.NOT_FOUND.value()).message("Game not found with id: " + id).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("/game/{nameSlug}")
    private ResponseEntity<Object> getGameBySlug(@PathVariable String nameSlug) {
        Optional<Game> game = gameRepository.findByNameSlug(nameSlug);

        if (game.isPresent()) {
            return ResponseEntity.ok(game.get());
        } else {
            ErrorResponseDTO errorResponse = ErrorResponseDTO.builder().status(HttpStatus.NOT_FOUND.value()).message("Game not found with name slug: " + nameSlug).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
