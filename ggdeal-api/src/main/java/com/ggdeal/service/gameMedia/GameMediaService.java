package com.ggdeal.service.gameMedia;

import com.ggdeal.model.GameMedia;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GameMediaService {
    List<GameMedia> findByGameId(Long gameId);
    GameMedia saveMedia(Long gameId, MultipartFile file, boolean isThumbnail);
    GameMedia updateMedia(Long mediaId, MultipartFile file, boolean isThumbnail);
    void setAsThumbnail(Long mediaId);
    void deleteMedia(Long mediaId);
}
