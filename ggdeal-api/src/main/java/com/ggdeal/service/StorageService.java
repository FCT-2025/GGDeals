package com.ggdeal.service;

import com.ggdeal.model.GameMedia;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    String storeAvatar(MultipartFile file, String oldAvatarPath) throws IOException;
    String storeAvatar(MultipartFile file) throws IOException;
    void deleteFileAvatar(String filePath) throws IOException;
    GameMedia storeGameMedia(MultipartFile[] file) throws IOException;
    void deleteGameMedia(GameMedia[] gameMedia) throws IOException;

}