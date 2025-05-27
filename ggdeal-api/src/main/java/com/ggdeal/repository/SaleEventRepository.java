package com.ggdeal.repository;

import com.ggdeal.model.SaleEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SaleEventRepository extends JpaRepository<SaleEvent, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM SaleEvent se WHERE se.sale.id = :saleId")
    void deleteBySaleId(@Param("saleId") Long saleId);
}