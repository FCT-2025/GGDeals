package com.ggdeal.controller.api.ggdeal;

import com.ggdeal.exception.ErrorResponseDTO;
import com.ggdeal.model.Game;
import com.ggdeal.repository.GameRepository;
import com.ggdeal.specification.GameSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/ggdeal")
public class GameController {
    @Autowired
    private GameRepository gameRepository;

    @GetMapping("/game")
    private ResponseEntity<Page<Game>> getGames(@RequestParam(required = false) Long id,
                                                @RequestParam(required = false) String title,
                                                @RequestParam(required = false) String genre,
                                                @RequestParam(required = false) Integer releasedLastDays,
                                                @RequestParam(required = false) Boolean isPublished,
                                                @RequestParam(required = false, defaultValue = "0") int page,
                                                @RequestParam(required = false, defaultValue = "10") int size,
                                                @RequestParam(required = false, defaultValue = "id") String sortBy,
                                                @RequestParam(required = false, defaultValue = "asc") String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Game> spec = GameSpecification.filterBy(id, title, genre, releasedLastDays, isPublished);
        Page<Game> games = gameRepository.findAll(spec, pageable);

        return ResponseEntity.ok(games);
    }

    @GetMapping("/game/{idOrSlug}")
    private ResponseEntity<?> getGame(@PathVariable String idOrSlug) {
        if (idOrSlug == null || idOrSlug.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "No se ha proporcionado un ID o slug válido"
            ));
        }

        Optional<Game> game;

        try {
            Long id = Long.parseLong(idOrSlug);
            game = gameRepository.findById(id);
        } catch (NumberFormatException ex) {
            game = gameRepository.findByNameSlug(idOrSlug);
        }

        return game.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                        "message", "No se ha encontrado el juego con identificador: " + idOrSlug
                )));
    }
}

