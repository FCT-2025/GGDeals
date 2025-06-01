package com.ggdeal.repository;

import com.ggdeal.model.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long>, JpaSpecificationExecutor<Game> {
    Optional<Game> findByNameSlug(String nameSlug);

    Page<Game> findAll(Pageable pageable);

        boolean existsByReplicasPlatformModelId(Long platformId);

}
