package com.ggdeal.service.game;

import com.ggdeal.model.Edition;
import com.ggdeal.model.Feature;
import com.ggdeal.model.Game;
import com.ggdeal.model.GameMedia;
import com.ggdeal.repository.EditionRepository;
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
    private final EditionRepository editionRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository,
                           FeatureRepository featureRepository,
                           EditionRepository editionRepository) {
        this.gameRepository = gameRepository;
        this.featureRepository = featureRepository;
        this.editionRepository = editionRepository;
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
        // Verificar que el juego existe
        gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado con ID: " + gameId));

        return editionRepository.findByGameId(gameId);
    }

    @Override
    @Transactional
    public Edition addEdition(Long gameId, Edition edition) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Juego no encontrado con ID: " + gameId));

        edition.setGame(game);
        return editionRepository.save(edition);
    }

    @Override
    @Transactional
    public Edition updateEdition(Edition edition) {
        Edition existingEdition = editionRepository.findById(edition.getId())
                .orElseThrow(() -> new RuntimeException("Edición no encontrada con ID: " + edition.getId()));

        existingEdition.setName(edition.getName());
        existingEdition.setDescription(edition.getDescription());
        existingEdition.setPrice(edition.getPrice());
        return editionRepository.save(existingEdition);
    }

    @Override
    @Transactional
    public void deleteEdition(Long editionId) {
        if (!editionRepository.existsById(editionId)) {
            throw new RuntimeException("Edición no encontrada con ID: " + editionId);
        }
        editionRepository.deleteById(editionId);
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