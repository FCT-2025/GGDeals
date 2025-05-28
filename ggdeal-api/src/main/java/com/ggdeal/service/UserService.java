package com.ggdeal.service;

import com.ggdeal.model.User;
import com.ggdeal.repository.UserRepository;
import com.ggdeal.service.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final StorageService fileStorageService;

    @Autowired
    public UserService(UserRepository userRepository, StorageService fileStorageService) {
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User save(User user, MultipartFile avatarFile) throws IOException {
        if (avatarFile != null && !avatarFile.isEmpty()) {
            String fileName = fileStorageService.storeAvatar(avatarFile);
            user.setAvatarPath(fileName);
        }
        return userRepository.save(user);
    }

    public User update(User user, MultipartFile avatarFile) throws IOException {
        if (avatarFile != null && !avatarFile.isEmpty()) {
            String fileName = fileStorageService.storeAvatar(avatarFile, user.getAvatarPath());
            user.setAvatarPath(fileName);
        }
        return userRepository.save(user);
    }

    public void delete(Long id) throws IOException {
        User user = findById(id);

        if (user.getAvatarPath() != null) {
            fileStorageService.deleteFileAvatar(user.getAvatarPath());
        }

        userRepository.delete(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}