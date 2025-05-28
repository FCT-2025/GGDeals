package com.ggdeal.service.storage;


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
public class StorageServiceImpl implements StorageService {

    @Value("${app.upload-dir}")
    private String uploadDir;

    @Override
    public String storeAvatar(MultipartFile file, String oldAvatarPath) throws IOException {
        if (file == null || file.isEmpty()) return null;


        deleteFileAvatar(oldAvatarPath);


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
        if (file == null || file.isEmpty()) return null;

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
        if (filePath != null || !filePath.isBlank()) {
            Path path = Paths.get(uploadDir + "avatar/");
            Path destination = path.resolve(filePath);
            Files.deleteIfExists(destination);
        }
    }

    @Override
    public String storeMedia(MultipartFile file, String oldAvatarPath) throws IOException {
        if (file ==  null || file.isEmpty()) return null;

        deleteFileMedia(oldAvatarPath);

        Path uploadPath = Paths.get(uploadDir + "media/");
        Files.createDirectories(uploadPath);

        String filename = UUID.randomUUID() + "." +
                StringUtils.getFilenameExtension(file.getOriginalFilename());

        Path destination = uploadPath.resolve(filename);
        file.transferTo(destination);

        return filename;
    }

    @Override
    public String storeMedia(MultipartFile file) throws IOException {
        if (file ==  null || file.isEmpty()) return null;

        Path uploadPath = Paths.get(uploadDir + "media/");
        Files.createDirectories(uploadPath);

        String filename = UUID.randomUUID() + "." +
                StringUtils.getFilenameExtension(file.getOriginalFilename());

        Path destination = uploadPath.resolve(filename);
        file.transferTo(destination);

        return filename;
    }

    @Override
    public void deleteFileMedia(String filePath) throws IOException {
        if (filePath != null || !filePath.isBlank()) {
            Path path = Paths.get(uploadDir + "media/");
            Path destination = path.resolve(filePath);
            Files.deleteIfExists(destination);
        }
    }
}

