package com.ggdeal.repository;

import com.ggdeal.model.GameMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameMediaRepository extends JpaRepository<GameMedia, Long> {
    List<GameMedia> findByGameId(Long gameId);
}