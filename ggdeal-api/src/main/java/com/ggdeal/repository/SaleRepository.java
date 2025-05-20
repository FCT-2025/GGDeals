package com.ggdeal.repository;

import com.ggdeal.dto.PopularGameSalesDTO;
import com.ggdeal.dto.SalesPerMonthDTO;
import com.ggdeal.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findTop5ByOrderByPurcharseDateDesc();

    @Query("SELECT new com.ggdeal.dto.PopularGameSalesDTO(g.title, COUNT(s.id)) " +
            "FROM Sale s " +
            "JOIN s.replica r " +
            "JOIN r.game g " +
            "GROUP BY g.title " +
            "ORDER BY COUNT(s.id) DESC")
    List<PopularGameSalesDTO> findTop5PopularGames();

    @Query("SELECT new com.ggdeal.dto.SalesPerMonthDTO(MONTH(s.purcharseDate), COUNT(s.id)) " +
            "FROM Sale s " +
            "GROUP BY MONTH(s.purcharseDate) " +
            "ORDER BY MONTH(s.purcharseDate) DESC")
    List<SalesPerMonthDTO> findNumberSalesPerMonth();
}
