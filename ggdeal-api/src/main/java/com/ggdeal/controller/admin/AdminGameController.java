package com.ggdeal.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggdeal.exception.DuplicateGameNameException;
import com.ggdeal.model.Edition;
import com.ggdeal.model.Feature;
import com.ggdeal.model.Game;
import com.ggdeal.model.GameMedia;
import com.ggdeal.model.Genre;
import com.ggdeal.repository.GenreRepostiory;
import com.ggdeal.service.FeatureService;
import com.ggdeal.service.game.GameService;
import com.ggdeal.service.gameMedia.GameMediaService;
import com.ggdeal.service.game.GameServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.*;

@RequestMapping("/api/admin/games")
@Controller
public class AdminGameController {

    private final GameService gameServiceImpl;
    private final ObjectMapper objectMapper;
    private final FeatureService featureService;
    private final GameMediaService gameMediaService;
    private final GenreRepostiory genreRepostiory;

    @Autowired
    public AdminGameController(GameService gameServiceImpl, ObjectMapper objectMapper,
                               FeatureService featureService, GameMediaService gameMediaService, GenreRepostiory genreRepostiory) {
        this.gameServiceImpl = gameServiceImpl;
        this.objectMapper = objectMapper;
        this.featureService = featureService;
        this.gameMediaService = gameMediaService;
        this.genreRepostiory = genreRepostiory;
    }

    @GetMapping("")
    public String adminGameDashboard(Model model) throws JsonProcessingException {
        List<Game> games = gameServiceImpl.findAll();
        List<Feature> features = featureService.getAllFeatures();
        Map<Long, String> thumbnails = new HashMap<>();
        List<Genre> genres = genreRepostiory.findAll();

        games.forEach(game -> {
            game.getGameMedias().stream()
                    .filter(GameMedia::getIsThumbnail)
                    .findFirst()
                    .ifPresent(media -> thumbnails.put(game.getId(), media.getPath()));
        });

        model.addAttribute("genres", genres);
        model.addAttribute("features", features);
        model.addAttribute("genreRepostiory", genres);
        model.addAttribute("games", games);
        model.addAttribute("thumbnails", thumbnails);

        return "admin/games";
    }

    // ==================== ENDPOINTS PARA GESTIÓN DE JUEGOS ====================

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<Game>> getGames() {
        return ResponseEntity.ok(gameServiceImpl.findAll());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Game> getGame(@PathVariable Long id) {
        return gameServiceImpl.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> createGame(@RequestBody Game game) {
        try {
            return ResponseEntity.ok(gameServiceImpl.save(game));
        } catch (DuplicateGameNameException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> updateGame(@PathVariable Long id, @RequestBody Game game) {
        game.setId(id);
        try {
            return ResponseEntity.ok(gameServiceImpl.update(game));
        } catch (DuplicateGameNameException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        gameServiceImpl.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ==================== ENDPOINTS PARA GESTIÓN DE CARACTERÍSTICAS ====================

    @PostMapping("/{gameId}/features")
    public ResponseEntity<Void> updateGameFeatures(@PathVariable Long gameId, @RequestBody List<Long> featureIds) {
        gameServiceImpl.updateFeatures(gameId, featureIds);
        return ResponseEntity.ok().build();
    }

    // ==================== ENDPOINTS PARA GESTIÓN DE MEDIOS ====================

    @GetMapping("/{gameId}/media")
    @ResponseBody
    public ResponseEntity<List<GameMedia>> getGameMedia(@PathVariable Long gameId) {
        return gameServiceImpl.findById(gameId)
                .map(game -> {
                            List<GameMedia> medias = new ArrayList<>(game.getGameMedias());
                            medias.sort((a, b) -> Boolean.compare(!a.getIsThumbnail(), !b.getIsThumbnail()));
                            return ResponseEntity.ok(medias);
                        }
                ).orElse(ResponseEntity.notFound().build());

    }

    @PostMapping("/{gameId}/media")
    @ResponseBody
    public ResponseEntity<List<GameMedia>> uploadGameMedia(
            @PathVariable Long gameId,
            @RequestParam("media") MultipartFile[] files,
            @RequestParam(value = "isThumbnail", defaultValue = "false") boolean isThumbnail) {
        List<GameMedia> savedMedia = new ArrayList<>();
        for (MultipartFile file : files) {
            GameMedia media = gameMediaService.saveMedia(gameId, file, isThumbnail);
            savedMedia.add(media);
        }
        return ResponseEntity.ok(savedMedia);
    }

    @PutMapping("/media/{mediaId}")
    @ResponseBody
    public ResponseEntity<GameMedia> updateGameMedia(
            @PathVariable Long mediaId,
            @RequestParam(value = "media", required = false) MultipartFile file,
            @RequestParam(value = "isThumbnail", defaultValue = "false") boolean isThumbnail) {

        GameMedia media = gameMediaService.updateMedia(mediaId, file, isThumbnail);
        return ResponseEntity.ok(media);
    }

    @PutMapping("/media/{mediaId}/set-thumbnail")
    @ResponseBody
    public ResponseEntity<Void> setAsThumbnail(
            @PathVariable Long mediaId) {

        gameMediaService.setAsThumbnail(mediaId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/media/{mediaId}")
    @ResponseBody
    public ResponseEntity<?> deleteGameMedia(
            @PathVariable Long mediaId) {

        gameMediaService.deleteMedia(mediaId);
        return ResponseEntity.ok().build();
    }
    // ==================== ENDPOINTS PARA GESTIÓN DE EDICIONES ====================
    // Obtener todas las ediciones de un juego
    @GetMapping("/{gameId}/editions")
    @ResponseBody
    public ResponseEntity<List<Edition>> getGameEditions(@PathVariable Long gameId) {
        return ResponseEntity.ok(gameServiceImpl.findEditionsByGameId(gameId));
    }

    // Añadir una nueva edición
    @PostMapping("/{gameId}/editions")
    @ResponseBody
    public ResponseEntity<Edition> addGameEdition(
            @PathVariable Long gameId,
            @RequestBody Edition edition) {
        return ResponseEntity.ok(gameServiceImpl.addEdition(gameId, edition));
    }

    // Actualizar una edición existente
    @PutMapping("/editions/{editionId}")
    @ResponseBody
    public ResponseEntity<Edition> updateEdition(
            @PathVariable Long editionId,
            @RequestBody Edition edition) {
        edition.setId(editionId);
        return ResponseEntity.ok(gameServiceImpl.updateEdition(edition));
    }

    // Eliminar una edición
    @DeleteMapping("/editions/{editionId}")
    @ResponseBody
    public ResponseEntity<Void> deleteEdition(@PathVariable Long editionId) {
        gameServiceImpl.deleteEdition(editionId);
        return ResponseEntity.noContent().build();
    }
}