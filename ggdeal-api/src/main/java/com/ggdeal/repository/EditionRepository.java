package com.ggdeal.repository;

import com.ggdeal.model.Edition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EditionRepository extends JpaRepository<Edition, Long> {
    List<Edition> findByGameId(Long gameId);
}