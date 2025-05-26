package com.ggdeal.service;

import com.ggdeal.model.PlatformModel;
import com.ggdeal.repository.PlatformModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlatformService {

    private final PlatformModelRepository platformRepository;

    @Autowired
    public PlatformService(PlatformModelRepository platformRepository) {
        this.platformRepository = platformRepository;
    }

    public List<PlatformModel> findAll() {
        return platformRepository.findAll();
    }

    public Optional<PlatformModel> findById(Long id) {
        return platformRepository.findById(id);
    }

    @Transactional
    public PlatformModel save(PlatformModel platform) {
        return platformRepository.save(platform);
    }

    @Transactional
    public void deleteById(Long id) {
        platformRepository.deleteById(id);
    }
}