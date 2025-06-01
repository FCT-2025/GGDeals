package com.ggdeal.service;

import com.ggdeal.dto.admin.PopularGameSalesDTO;
import com.ggdeal.dto.admin.SalesPerMonthDTO;
import com.ggdeal.model.Sale;
import com.ggdeal.repository.GameRepository;
import com.ggdeal.repository.ReplicaRepository;
import com.ggdeal.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatisticsService {

    private final SaleRepository saleRepository;
    private final GameRepository gameRepository;
    private final ReplicaRepository replicaRepository;

    @Autowired
    public StatisticsService(SaleRepository saleRepository,
                             GameRepository gameRepository,
                             ReplicaRepository replicaRepository) {
        this.saleRepository = saleRepository;
        this.gameRepository = gameRepository;
        this.replicaRepository = replicaRepository;
    }

    /**
     * Obtiene estadísticas generales de ventas
     * @return Mapa con diferentes métricas de ventas
     */
    public Map<String, Object> getSalesStatistics() {
        Map<String, Object> stats = new HashMap<>();

        // Calcular estadísticas generales de ventas
        List<Sale> allSales = saleRepository.findAll();

        // Ventas totales
        stats.put("totalSales", saleRepository.count());

        // Ingresos totales
        Double totalRevenue = allSales.stream()
                .map(Sale::getAmount)
                .reduce(0.0, Double::sum);
        stats.put("totalRevenue", totalRevenue);

        // Venta promedio
        if (!allSales.isEmpty()) {
            stats.put("averageSale", totalRevenue / allSales.size());
        } else {
            stats.put("averageSale", 0.0);
        }

        // Réplicas disponibles
        stats.put("availableReplicas", replicaRepository.countByIsSold(false));

        // Ventas por período (últimos 7 días, 30 días)
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sevenDaysAgo = now.minusDays(7);
        LocalDateTime thirtyDaysAgo = now.minusDays(30);

        long salesLast7Days = allSales.stream()
                .filter(s -> s.getPurchaseDate().isAfter(sevenDaysAgo))
                .count();
        stats.put("salesLast7Days", salesLast7Days);

        long salesLast30Days = allSales.stream()
                .filter(s -> s.getPurchaseDate().isAfter(thirtyDaysAgo))
                .count();
        stats.put("salesLast30Days", salesLast30Days);

        // Agregar estadísticas adicionales
        List<PopularGameSalesDTO> popularGames = saleRepository.findTop5PopularGames();
        stats.put("popularGames", popularGames);

        List<SalesPerMonthDTO> salesPerMonth = saleRepository.findNumberSalesPerMonth();
        stats.put("salesPerMonth", salesPerMonth);

        return stats;
    }

    /**
     * Obtiene estadísticas de ventas por categoría
     * @return Mapa de categorías con métricas por categoría
     */
    public Map<String, Object> getCategorySales() {
        List<Sale> allSales = saleRepository.findAll();

        // Agrupar ventas por categoría de juego
        Map<String, Object> categorySales = allSales.stream()
                .filter(sale -> sale.getReplica() != null && sale.getReplica().getGame() != null)
                .collect(Collectors.groupingBy(
                        sale -> sale.getReplica().getGame().getGenre().getName(), // Cambiado de getCategory() a getGenre()
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                salesList -> {
                                    Map<String, Object> result = new HashMap<>();
                                    result.put("count", salesList.size());
                                    result.put("revenue", salesList.stream()
                                            .map(Sale::getAmount)
                                            .reduce(0.0, Double::sum));
                                    return result;
                                }
                        )
                ));

        return categorySales;
    }

    /**
     * Obtiene métricas de ventas para el dashboard
     * @return Mapa con métricas combinadas
     */
    public Map<String, Object> getDashboardMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.putAll(getSalesStatistics());
        metrics.put("categorySales", getCategorySales());
        metrics.put("recentSales", saleRepository.findTop5ByOrderByPurchaseDateDesc());
        return metrics;
    }
}