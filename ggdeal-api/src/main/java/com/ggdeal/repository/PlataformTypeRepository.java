package com.ggdeal.repository;

import com.ggdeal.dto.DistributionPlataformDTO;
import com.ggdeal.model.PlatformType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlataformTypeRepository extends JpaRepository<PlatformType, Long> {
    @Query("SELECT new com.ggdeal.dto.DistributionPlataformDTO(p.name, COUNT(r)) " +
            "FROM PlatformType p LEFT JOIN p.replicas r " +
            "GROUP BY p.name")
    List<DistributionPlataformDTO> findWithDistributionOfReplica();
}
