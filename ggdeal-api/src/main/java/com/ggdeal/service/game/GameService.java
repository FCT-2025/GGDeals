package com.ggdeal.service.game;

import com.ggdeal.model.Edition;
import com.ggdeal.model.Game;

import java.util.List;
import java.util.Optional;

public interface GameService {
    List<Game> findAll();
    Optional<Game> findById(Long id);
    Game save(Game game);
    void deleteById(Long id);
    void updateFeatures(Long gameId, List<Long> featureIds);
    List<Edition> findEditionsByGameId(Long gameId);
    Edition addEdition(Long gameId, Edition edition);
    Edition updateEdition(Edition edition);
    void deleteEdition(Long editionId);
}
