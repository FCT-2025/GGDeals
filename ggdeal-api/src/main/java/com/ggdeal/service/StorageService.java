package com.ggdeal.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageService {
    String storeAvatar(MultipartFile file, String oldAvatarPath) throws IOException;
    void deleteFile(String filePath) throws IOException;
}