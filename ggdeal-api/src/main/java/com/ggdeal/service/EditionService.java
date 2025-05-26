package com.ggdeal.service;

import com.ggdeal.model.Edition;
import com.ggdeal.repository.EditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EditionService {

    private final EditionRepository editionRepository;

    @Autowired
    public EditionService(EditionRepository editionRepository) {
        this.editionRepository = editionRepository;
    }

    public List<Edition> findAll() {
        return editionRepository.findAll();
    }

    public Optional<Edition> findById(Long id) {
        return editionRepository.findById(id);
    }

    @Transactional
    public Edition save(Edition edition) {
        return editionRepository.save(edition);
    }

    @Transactional
    public void deleteById(Long id) {
        editionRepository.deleteById(id);
    }
}