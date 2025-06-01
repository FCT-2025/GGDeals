package com.ggdeal.controller.admin;

import com.ggdeal.model.Genre;
import com.ggdeal.model.PlatformModel;
import com.ggdeal.service.GenreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.http.HttpResponse;
import java.util.List;

@Controller
@RequestMapping("/api/admin/genre")
public class AdminGenreController {

    private final String GENRE_VIEW = "admin/genre";
    private final GenreService genreService;

    @Autowired
    public AdminGenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public String genreDashBoard(Model model) {
        model.addAttribute("genres", genreService.findAll());
        return GENRE_VIEW;
    }

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<Genre>> getGenres() {
        return ResponseEntity.ok(genreService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> getGenre(@PathVariable Long id) {
        return genreService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Genre> createGenre(@RequestBody @Valid Genre genre) {
        return ResponseEntity.ok(genreService.save(genre));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody @Valid Genre genre) {
        genre.setId(id);
        return ResponseEntity.ok(genreService.update(genre));
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Void> deleteGenre(@PathVariable Long id) {
        genreService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
