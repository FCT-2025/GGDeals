package com.ggdeal.service.storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    String storeAvatar(MultipartFile file, String oldAvatarPath) throws IOException;
    String storeAvatar(MultipartFile file) throws IOException;
    void deleteFileAvatar(String filePath) throws IOException;
    String storeMedia(MultipartFile file, String oldAvatarPath) throws IOException;
    String storeMedia(MultipartFile file) throws IOException;
    void deleteFileMedia(String filePath) throws IOException;
}