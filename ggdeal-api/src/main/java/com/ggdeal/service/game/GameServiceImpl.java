package com.ggdeal.service.game;

import com.ggdeal.model.Edition;
import com.ggdeal.model.Feature;
import com.ggdeal.model.Game;
import com.ggdeal.model.GameMedia;
import com.ggdeal.repository.FeatureRepository;
import com.ggdeal.repository.GameRepository;
import com.ggdeal.service.gameMedia.GameMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final FeatureRepository featureRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository, FeatureRepository featureRepository) {
        this.gameRepository = gameRepository;
        this.featureRepository = featureRepository;
    }

    public List<Game> findAll() {
        return gameRepository.findAll();
    }

    public Optional<Game> findById(Long id) {
        return gameRepository.findById(id);
    }

    public Optional<Game> findByNameSlug(String nameSlug) {
        return gameRepository.findByNameSlug(nameSlug);
    }

    public void updateFeatures(Long gameId, List<Long> featureIds) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado"));

        List<Feature> features = featureRepository.findAllById(featureIds);
        game.setFeatures(features);

        gameRepository.save(game);
    }

    @Override
    public List<Edition> findEditionsByGameId(Long gameId) {
        return List.of();
    }

    @Override
    public Edition addEdition(Long gameId, Edition edition) {
        return null;
    }

    @Override
    public Edition updateEdition(Edition edition) {
        return null;
    }

    @Override
    public void deleteEdition(Long editionId) {

    }

    @Transactional
    public Game save(Game game) {
        return gameRepository.save(game);
    }

    @Transactional
    public void deleteById(Long id) {
        gameRepository.deleteById(id);
    }


}