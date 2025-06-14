package com.ggdeal.repository;

import com.ggdeal.model.PlatformType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatformTypeRepository extends JpaRepository<PlatformType, Long> {

    @Query("SELECT p, COUNT(r) FROM PlatformType p LEFT JOIN PlatformModel pm ON pm.platformType = p LEFT JOIN Replica r ON r.platformModel = pm GROUP BY p")
    List<Object[]> findWithDistributionOfReplica();
}