package com.ggdeal.service;

import com.ggdeal.model.Genre;
import com.ggdeal.repository.GenreRepostiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GenreService {

    private final GenreRepostiory genreRepostiory;

    @Autowired
    public GenreService(GenreRepostiory genreRepostiory) {
        this.genreRepostiory = genreRepostiory;
    }

    public List<Genre> findAll() {
        return genreRepostiory.findAll();
    }

    public Optional<Genre> findById(Long id) {
        return genreRepostiory.findById(id);
    }

    @Transactional
    public Genre save(Genre genre) {
        return genreRepostiory.save(genre);
    }

    @Transactional
    public Genre update(Genre genre) {
        Genre genreSearched = genreRepostiory.findById(genre.getId()).get();
        if(genreSearched == null) {
            throw  new RuntimeException("El genero no existe");
        }

        genreSearched.setName(genre.getName());

        return genreRepostiory.save(genreSearched);
    }

    @Transactional
    public void deleteById(Long id) {
        genreRepostiory.deleteById(id);
    }

}
