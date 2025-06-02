package com.ggdeal.controller.api.ggdeal;

import com.ggdeal.dto.api.GameDTO;
import com.ggdeal.dto.api.GameListingDTO;
import com.ggdeal.model.Game;
import com.ggdeal.repository.GameRepository;
import com.ggdeal.specification.GameSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${app.media-url}")
    private String mediaUrlBase;

    @GetMapping("/game")
    @ResponseBody
    private ResponseEntity<Page<GameListingDTO>> getGames(@RequestParam(required = false) Long id,
                                                          @RequestParam(required = false) String title,
                                                          @RequestParam(required = false) List<Long> genre,
                                                          @RequestParam(required = false) Integer releasedLastDays,
                                                          @RequestParam(required = false) Boolean isPublished,
                                                          @RequestParam(required = false) List<Long> platformModel,
                                                          @RequestParam(required = false) Float minPrice,
                                                          @RequestParam(required = false) Float maxPrice,
                                                          @RequestParam(required = false, defaultValue = "true") Boolean inStock,
                                                          @RequestParam(required = false, defaultValue = "0") int page,
                                                          @RequestParam(required = false, defaultValue = "10") int size,
                                                          @RequestParam(required = false, defaultValue = "id") String sortBy,
                                                          @RequestParam(required = false, defaultValue = "asc") String direction) {

        Sort sort = createSort(sortBy, direction);
        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Game> spec = GameSpecification.filterBy(id, title, genre, releasedLastDays,
                isPublished, platformModel, minPrice,
                maxPrice, inStock);
        Page<GameListingDTO> games = gameRepository.findAll(spec, pageable)
                .map(game -> new GameListingDTO(game, mediaUrlBase));

        return ResponseEntity.ok(games);
    }

    private Sort createSort(String sortBy, String direction) {
        Sort sort;

        switch (sortBy) {
            case "bestSelling":
                // Ordenar por número de ventas (réplicas vendidas) descendente
                sort = Sort.by(Sort.Direction.DESC, "replicas.sale.purchaseDate");
                break;
            case "priceLowToHigh":
                sort = Sort.by(Sort.Direction.ASC, "price");
                break;
            case "priceHighToLow":
                sort = Sort.by(Sort.Direction.DESC, "price");
                break;
            default:
                // Para otros casos, usar el sortBy y direction proporcionados
                sort = direction.equalsIgnoreCase("desc") ?
                        Sort.by(sortBy).descending() :
                        Sort.by(sortBy).ascending();
                break;
        }

        return sort;
    }

    @GetMapping("/game/{idOrSlug}")
    @ResponseBody
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
        } catch (Exception ex) {
            game = gameRepository.findByNameSlug(idOrSlug);
        }

        if(!game.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "message", "No se ha encontrado el juego con identificador: " + idOrSlug
            ));
        }
        GameDTO gameSearched = new GameDTO(game.get(), mediaUrlBase);

        return ResponseEntity.ok(gameSearched);

    }
}