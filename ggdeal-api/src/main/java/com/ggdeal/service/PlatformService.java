package com.ggdeal.service;

import com.ggdeal.model.PlatformModel;
import com.ggdeal.repository.PlatformModelRepository;
import com.ggdeal.service.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PlatformService {

    private final PlatformModelRepository platformRepository;
    private final StorageService storageService;

    @Autowired
    public PlatformService(PlatformModelRepository platformRepository, StorageService storageService) {
        this.platformRepository = platformRepository;
        this.storageService = storageService;
    }

    public List<PlatformModel> findAll() {
        return platformRepository.findAll();
    }

    public Optional<PlatformModel> findById(Long id) {
        return platformRepository.findById(id);
    }

    @Transactional
    public PlatformModel save(PlatformModel platform, MultipartFile platformLogo) {
        String path = null;

        try {
            path = storageService.storeMedia(platformLogo);
        } catch (IOException e) {

        }

        if(path != null) {
            platform.setPathLogo(path);
        }


        return platformRepository.save(platform);
    }

    @Transactional
    public PlatformModel update(PlatformModel platform, MultipartFile platformLogo) {
        PlatformModel platformModelSearched = platformRepository.findById(platform.getId()).get();

        if(platformModelSearched == null) {
            throw  new RuntimeException("No se ha encontrado el usuario");
        }


        String path = null;

        try {
            path = storageService.storeMedia(platformLogo);
        } catch (IOException e) {

        }

        if(path != null) {
            platformModelSearched.setPathLogo(path);
        }

        platformModelSearched.setName(platform.getName());

        return platformRepository.save(platformModelSearched);
    }


    @Transactional
    public void deleteById(Long id) {
        platformRepository.deleteById(id);
    }
}