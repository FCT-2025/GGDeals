package com.ggdeal.service;

import com.ggdeal.model.PlatformType;
import com.ggdeal.repository.PlatformTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PlatformTypeService {

    private final PlatformTypeRepository platformTypeRepository;

    @Autowired
    public PlatformTypeService(PlatformTypeRepository platformTypeRepository) {
        this.platformTypeRepository = platformTypeRepository;
    }

    public List<PlatformType> findAll() {
        return platformTypeRepository.findAll();
    }

    public Optional<PlatformType> findById(Long id) {
        return platformTypeRepository.findById(id);
    }

    @Transactional
    public PlatformType save(PlatformType platformType) {
        return platformTypeRepository.save(platformType);
    }

    @Transactional
    public void deleteById(Long id) {
        platformTypeRepository.deleteById(id);
    }
}