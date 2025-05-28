package com.ggdeal.service.gameMedia;

import com.ggdeal.model.Game;
import com.ggdeal.model.GameMedia;
import com.ggdeal.repository.GameMediaRepository;
import com.ggdeal.repository.GameRepository;
import com.ggdeal.service.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class GameMediaServiceImpl implements GameMediaService {

    private final GameMediaRepository gameMediaRepository;
    private final GameRepository gameRepository;
    private final StorageService storageService;

    @Autowired
    public GameMediaServiceImpl(GameRepository gameRepository, StorageService storageService, GameMediaRepository gameMediaRepository) {
        this.gameRepository = gameRepository;
        this.storageService = storageService;
        this.gameMediaRepository = gameMediaRepository;
    }

    @Override
    public List<GameMedia> findByGameId(Long gameId) {
        return List.of();
    }

    @Override
    public GameMedia saveMedia(Long gameId, MultipartFile file, boolean isThumbnail) {
        String pathMedia = null;

        Game currentGame = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Juego no encontrado"));

        List<GameMedia> gameMedias = currentGame.getGameMedias();

        if (gameMedias.size() > 6) {
            throw new RuntimeException("No se puede subir mas de 6 imágenes");
        }

        if (gameMedias.size() == 0) {
            isThumbnail = true;
        }

        try {
            pathMedia = storageService.storeMedia(file);
        } catch (Exception e) {
            throw new RuntimeException("No se han podido guardar las miniaturas");
        }

        if (pathMedia == null) {
            throw new RuntimeException("El archivo no fue guardado correctamente.");
        }

        if (gameMedias.size() >= 1 && isThumbnail) {
            gameMedias.stream()
                    .filter(media -> Boolean.TRUE.equals(media.getIsThumbnail()))
                    .findFirst()
                    .ifPresent(existingThumbnail -> {
                        existingThumbnail.setIsThumbnail(false);
                        gameMediaRepository.save(existingThumbnail);
                    });
        }


        return gameMediaRepository.save(GameMedia.builder()
                .isThumbnail(isThumbnail)
                .game(currentGame)
                .isThumbnail(isThumbnail)
                .path(pathMedia)
                .build());
    }

    @Override
    public GameMedia updateMedia(Long mediaId, MultipartFile file, boolean isThumbnail) {
        String pathMedia = null;

        GameMedia currentGameMedia = gameMediaRepository.findById(mediaId).orElseThrow(() -> new RuntimeException("Media no encontrada"));

        List<GameMedia> gameMedias = currentGameMedia.getGame().getGameMedias();

        try {
            pathMedia = storageService.storeMedia(file, currentGameMedia.getPath());
        } catch (Exception e) {
            throw new RuntimeException("No se han podido guardar las miniaturas");
        }


        if (gameMedias.size() >= 1 && isThumbnail) {
            gameMedias.stream()
                    .filter(media -> Boolean.TRUE.equals(media.getIsThumbnail()))
                    .findFirst()
                    .ifPresent(existingThumbnail -> {
                        existingThumbnail.setIsThumbnail(false);
                        gameMediaRepository.save(existingThumbnail);
                    });
        }

        if (pathMedia != null) {
            currentGameMedia.setPath(pathMedia);
        }

        currentGameMedia.setIsThumbnail(isThumbnail);

        return gameMediaRepository.save(currentGameMedia);
    }

    @Override
    public void setAsThumbnail(Long mediaId) {
        GameMedia gameMedia = gameMediaRepository.findById(mediaId).orElseThrow(() -> new RuntimeException("GameMedia no encontrado"));
        gameMedia.getGame().getGameMedias().stream().filter(media -> Boolean.TRUE.equals(media.getIsThumbnail())).findFirst().ifPresent(existingThumbnail -> {
            existingThumbnail.setIsThumbnail(false);
            gameMediaRepository.save(existingThumbnail);
        });

        gameMedia.setIsThumbnail(true);
        gameMediaRepository.save(gameMedia);
    }

    @Override
    public void deleteMedia(Long mediaId) {
        GameMedia gameMedia = gameMediaRepository.findById(mediaId)
                .orElseThrow(() -> new RuntimeException("GameMedia no encontrado"));

        Game game = gameMedia.getGame();

        gameMediaRepository.delete(gameMedia);
        List<GameMedia> remainingMedia = gameMediaRepository.findByGameId(game.getId());


        if (gameMedia.getIsThumbnail() && !remainingMedia.isEmpty()) {
            GameMedia newThumbnail = remainingMedia.get(0);
            newThumbnail.setIsThumbnail(true);
            gameMediaRepository.save(newThumbnail);
        }
    }


}
