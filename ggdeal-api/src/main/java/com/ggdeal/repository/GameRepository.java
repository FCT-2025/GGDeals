package com.ggdeal.repository;

import com.ggdeal.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long>, JpaSpecificationExecutor<Game> {
    public Optional<Game> findByNameSlug(String nameSlug);
}
