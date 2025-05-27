package com.ggdeal.service;

import com.ggdeal.model.Game;
import com.ggdeal.model.PlatformType;
import com.ggdeal.model.Replica;
import com.ggdeal.model.Edition;
import com.ggdeal.repository.ReplicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReplicaService {

    private final ReplicaRepository replicaRepository;
    private final EditionService editionService;

    @Autowired
    public ReplicaService(ReplicaRepository replicaRepository, EditionService editionService) {
        this.replicaRepository = replicaRepository;
        this.editionService = editionService;
    }

    /**
     * Obtiene todas las réplicas
     */
    public List<Replica> findAll() {
        return replicaRepository.findAll();
    }

    /**
     * Busca una réplica por su ID
     */
    public Optional<Replica> findById(Long id) {
        return replicaRepository.findById(id);
    }

    /**
     * Obtiene las réplicas según su estado de venta
     */
    public List<Replica> findByIsSold(boolean isSold) {
        return replicaRepository.findByIsSold(isSold);
    }

    /**
     * Guarda una réplica nueva o actualiza una existente
     */
    @Transactional
    public Replica save(Replica replica) {
        return replicaRepository.save(replica);
    }

    /**
     * Elimina una réplica por su ID
     */
    @Transactional
    public void deleteById(Long id) {
        replicaRepository.deleteById(id);
    }

    /**
     * Guarda un lote de réplicas con los mismos datos de juego, edición y plataforma
     */
    @Transactional
    public List<Replica> saveBatch(
            Game game,
            PlatformType platformType,
            Long editionId,
            List<String> activationKeys,
            boolean isSold
    ) {
        List<Replica> savedReplicas = new ArrayList<>();

        for (String key : activationKeys) {
            Replica replica = new Replica();
            replica.setActivation_key(key);
            replica.setGame(game);
            replica.setPlataform(platformType);

            // Buscar la edición por ID y asignarla directamente
            Edition edition = editionService.findById(editionId).orElse(null);
            replica.setEdition(edition);

            replica.setIsSold(isSold);

            savedReplicas.add(replicaRepository.save(replica));
        }

        return savedReplicas;
    }

    /**
     * Genera claves de activación automáticamente según un formato
     */
    public List<String> generateActivationKeys(int quantity, String format, String prefix) {
        List<String> keys = new ArrayList<>();
        for (int i = 0; i < quantity; i++) {
            String key = generateKey(format, prefix);
            keys.add(key);
        }
        return keys;
    }

    /**
     * Genera una clave de activación única según el formato solicitado
     */
    private String generateKey(String format, String prefix) {
        String uuid = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
        StringBuilder key = new StringBuilder();

        if (prefix != null && !prefix.isEmpty()) {
            key.append(prefix);
        }

        int charIndex = 0;
        for (char c : format.toCharArray()) {
            if (c == 'x' || c == 'X') {
                if (charIndex < uuid.length()) {
                    key.append(uuid.charAt(charIndex));
                    charIndex++;
                }
            } else {
                key.append(c);
            }
        }

        return key.toString();
    }

    /**
     * Cuenta el total de réplicas
     */
    public long countAll() {
        return replicaRepository.count();
    }

    /**
     * Cuenta réplicas por estado de venta
     */
    public long countByIsSold(boolean isSold) {
        return replicaRepository.countByIsSold(isSold);
    }
}
