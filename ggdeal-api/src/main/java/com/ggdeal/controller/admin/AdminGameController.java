package com.ggdeal.controller.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggdeal.model.Game;
import com.ggdeal.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/api/admin/games")
@Controller
public class AdminGameController {

    private final GameService gameService;
    private final ObjectMapper objectMapper;

    @Autowired
    public AdminGameController(GameService gameService, ObjectMapper objectMapper) {
        this.gameService = gameService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("")
    public String adminGameDashboard(Model model) throws JsonProcessingException {
        List<Game> games = gameService.findAll();
        model.addAttribute("games", games);
        model.addAttribute("gamesJson", objectMapper.writeValueAsString(games));
        return "admin/games";
    }

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<Game>> getGames() {
        return ResponseEntity.ok(gameService.findAll());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Game> getGame(@PathVariable Long id) {
        return gameService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        return ResponseEntity.ok(gameService.save(game));
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody Game game) {
        game.setId(id);
        return ResponseEntity.ok(gameService.save(game));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        gameService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
