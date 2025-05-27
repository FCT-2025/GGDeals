package com.ggdeal.service;


import com.ggdeal.model.GameMedia;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class LocalStorageService implements StorageService {

    @Value("${app.upload-dir}")
    private String uploadDir;

    @Override
    public String storeAvatar(MultipartFile file, String oldAvatarPath) throws IOException {
        if (file.isEmpty()) return null;

        if (oldAvatarPath != null) {
            deleteFileAvatar(oldAvatarPath);
        }

        Path uploadPath = Paths.get(uploadDir + "avatar/");
        Files.createDirectories(uploadPath);

        String filename = UUID.randomUUID() + "." +
                StringUtils.getFilenameExtension(file.getOriginalFilename());

        Path destination = uploadPath.resolve(filename);
        file.transferTo(destination);

        return filename;
    }

    @Override
    public String storeAvatar(MultipartFile file) throws IOException {
        if (file.isEmpty()) return null;

        Path uploadPath = Paths.get(uploadDir + "avatar/");
        Files.createDirectories(uploadPath);

        String filename = UUID.randomUUID() + "." +
                StringUtils.getFilenameExtension(file.getOriginalFilename());

        Path destination = uploadPath.resolve(filename);
        file.transferTo(destination);

        return filename;
    }

    @Override
    public void deleteFileAvatar(String filePath) throws IOException {
        if (filePath != null) {
            Path path = Paths.get(uploadDir + "avatar/");
            Path destination = path.resolve(filePath);
            Files.deleteIfExists(destination);
        }
    }

    @Override
    public GameMedia storeGameMedia(MultipartFile[] files) throws IOException {
        if (files == null || files.length == 0) return null;

        
        Path uploadPath = Paths.get(uploadDir + "game-media/");
        Files.createDirectories(uploadPath);

      
        GameMedia gameMedia = new GameMedia();

        
        if (files.length > 0 && !files[0].isEmpty()) {
            String filename = UUID.randomUUID() + "." +
                    StringUtils.getFilenameExtension(files[0].getOriginalFilename());
            Path destination = uploadPath.resolve(filename);
            files[0].transferTo(destination);
            gameMedia.setPath(filename); 
        }

        return gameMedia;
    }

    @Override
    public void deleteGameMedia(GameMedia[] gameMediaArray) throws IOException {
        if (gameMediaArray == null) return;

        Path path = Paths.get(uploadDir + "game-media/");

        for (GameMedia media : gameMediaArray) {
            if (media != null && media.getPath() != null) { 
                Path destination = path.resolve(media.getPath()); 
                Files.deleteIfExists(destination);
            }
        }
    }
}

