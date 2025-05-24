package com.ggdeal.repository;

import com.ggdeal.model.PlatformModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatformModelRepository extends JpaRepository<PlatformModel, Long> {
}