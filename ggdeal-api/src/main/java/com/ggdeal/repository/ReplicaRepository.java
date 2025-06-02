package com.ggdeal.repository;

import com.ggdeal.model.Replica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplicaRepository extends JpaRepository<Replica, Long> {
    List<Replica> findByIsSold(boolean isSold);
    long countByIsSold(boolean isSold);
    List<Replica> findByIsSoldFalse();
    List<Replica> findByGameId(Long gameId);
    @Query("SELECT r FROM Replica r WHERE r.game.id = :gameId AND r.isSold = false ORDER BY r.id ASC")
    List<Replica> findAvailableByGameId(@Param("gameId") Long gameId, @Param("limit") int limit);

    // Alternativa si no funciona el limit en la query
    @Query("SELECT r FROM Replica r WHERE r.game.id = :gameId AND r.isSold = false ORDER BY r.id ASC")
    List<Replica> findAvailableByGameId(@Param("gameId") Long gameId);
}