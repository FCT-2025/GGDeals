package com.ggdeal.repository;

import com.ggdeal.model.Replica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplicaRepository extends JpaRepository<Replica, Long> {
    List<Replica> findByIsSold(boolean isSold);
    long countByIsSold(boolean isSold);
}