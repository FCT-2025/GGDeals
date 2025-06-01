package com.ggdeal.service;

import com.ggdeal.model.Game;
import com.ggdeal.model.PlatformType;
import com.ggdeal.model.PlatformModel;
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
     *
     * @param game El juego asociado a las réplicas
     * @param platformModel El modelo de plataforma asociado a las réplicas
     * @param editionId El ID de la edición asociada a las réplicas
     * @param activationKeys Lista de claves de activación para cada réplica
     * @param isSold Estado de venta inicial para las réplicas
     * @return Lista de réplicas guardadas
     */
    @Transactional
    public List<Replica> saveBatch(Game game, PlatformModel platformModel, Long editionId,
                                   List<String> activationKeys, boolean isSold) {
        List<Replica> replicas = new ArrayList<>();

        Optional<Edition> edition = Optional.empty();
        if (editionId != null) {
            edition = editionService.findById(editionId);
        }

        for (String key : activationKeys) {
            Replica replica = new Replica();
            replica.setGame(game);
            replica.setPlatformModel(platformModel);

            edition.ifPresent(replica::setEdition);
            replica.setActivationKey(key);

            replica.setIsSold(isSold);

            replicas.add(replicaRepository.save(replica));
        }

        return replicas;
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