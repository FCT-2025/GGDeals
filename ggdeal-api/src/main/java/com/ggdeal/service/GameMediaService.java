package com.ggdeal.service;

import com.ggdeal.model.GameMedia;
import com.ggdeal.repository.GameMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class GameMediaService {

    private final GameMediaRepository gameMediaRepository;

    @Autowired
    public GameMediaService(GameMediaRepository gameMediaRepository) {
        this.gameMediaRepository = gameMediaRepository;
    }

    public List<GameMedia> findByGameId(Long gameId) {
        return gameMediaRepository.findByGameId(gameId);
    }

    @Transactional
    public GameMedia save(GameMedia gameMedia) {
        return gameMediaRepository.save(gameMedia);
    }

    @Transactional
    public void deleteById(Long id) {
        gameMediaRepository.deleteById(id);
    }
}