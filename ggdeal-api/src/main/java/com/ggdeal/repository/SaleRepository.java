package com.ggdeal.repository;

import com.ggdeal.dto.admin.PopularGameSalesDTO;
import com.ggdeal.dto.admin.SalesPerMonthDTO;
import com.ggdeal.model.Sale;
import com.ggdeal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findTop5ByOrderByPurchaseDateDesc(); // Corregido de purcharseDate

    @Query("SELECT new com.ggdeal.dto.admin.PopularGameSalesDTO(g.title, COUNT(s.id)) " +
            "FROM Sale s " +
            "JOIN s.replica r " +
            "JOIN r.game g " +
            "GROUP BY g.title " +
            "ORDER BY COUNT(s.id) DESC")
    List<PopularGameSalesDTO> findTop5PopularGames();

    @Query("SELECT new com.ggdeal.dto.admin.SalesPerMonthDTO(MONTH(s.purchaseDate), COUNT(s.id)) " +
            "FROM Sale s " +
            "GROUP BY MONTH(s.purchaseDate) " +
            "ORDER BY MONTH(s.purchaseDate) DESC")
    List<SalesPerMonthDTO> findNumberSalesPerMonth();
    List<Sale> findByUserOrderByPurchaseDateDesc(User user);
}