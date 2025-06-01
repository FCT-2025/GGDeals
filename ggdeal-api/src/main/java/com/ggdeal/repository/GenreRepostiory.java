package com.ggdeal.repository;


import com.ggdeal.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GenreRepostiory extends JpaRepository<Genre, Long>{
}
