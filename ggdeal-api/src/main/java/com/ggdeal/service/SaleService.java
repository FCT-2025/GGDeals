package com.ggdeal.service;

import com.ggdeal.dto.admin.PopularGameSalesDTO;
import com.ggdeal.dto.admin.SalesPerMonthDTO;
import com.ggdeal.model.Replica;
import com.ggdeal.model.Sale;
import com.ggdeal.model.SaleEvent;
import com.ggdeal.model.User;
import com.ggdeal.repository.ReplicaRepository;
import com.ggdeal.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final ReplicaRepository replicaRepository;

    @Autowired
    public SaleService(SaleRepository saleRepository, ReplicaRepository replicaRepository) {
        this.saleRepository = saleRepository;
        this.replicaRepository = replicaRepository;
    }

    /**
     * Obtiene todas las ventas
     * @return Lista de todas las ventas
     */
    public List<Sale> findAll() {
        return saleRepository.findAll();
    }

    /**
     * Busca una venta por su ID
     * @param id Identificador de la venta
     * @return Venta encontrada o empty si no existe
     */
    public Optional<Sale> findById(Long id) {
        return saleRepository.findById(id);
    }

    /**
     * Guarda una venta nueva o actualiza una existente
     * @param sale Entidad de venta a guardar
     * @return Venta guardada con su ID generado
     */
    @Transactional
    public Sale save(Sale sale) {
        // Si es una venta nueva
        if (sale.getId() == null) {
            // Si no tiene fecha de compra, usar la fecha actual
            if (sale.getPurchaseDate() == null) {
                sale.setPurchaseDate(LocalDateTime.now());
            }

            // Si tiene réplica asociada, marcarla como vendida
            if (sale.getReplica() != null && !sale.getReplica().getIsSold()) {
                Replica replica = sale.getReplica();
                replica.setIsSold(true);
                replicaRepository.save(replica);
            }

            // Si es una venta nueva, asignar purchaseAmount igual que amount
            if (sale.getId() == null) {
                // Asignar el mismo valor que amount
                if (sale.getPurchaseAmount() == null) {
                    sale.setPurchaseAmount(sale.getAmount());
                }
            }
            // Si no tiene estado, establecer por defecto a "completed"
            if (sale.getStatus() == null) {
                sale.setStatus("completed");
            }

            // Registrar evento de creación de venta
            SaleEvent event = SaleEvent.builder()
                    .sale(sale)
                    .timestamp(LocalDateTime.now())
                    .title("Venta creada")
                    .description("Venta registrada correctamente en el sistema")
                    .type("success")
                    .build();

            if (sale.getEvents() == null) {
                sale.setEvents(new ArrayList<>());
            }
            sale.getEvents().add(event);
        } else {
            // Es una actualización - buscar la venta existente
            Optional<Sale> existingSale = saleRepository.findById(sale.getId());

            if (existingSale.isPresent()) {
                // Si se cambia la réplica, actualizar estados
                if (sale.getReplica() != null && existingSale.get().getReplica() != null &&
                        !sale.getReplica().getId().equals(existingSale.get().getReplica().getId())) {

                    // Liberar réplica antigua
                    Replica oldReplica = existingSale.get().getReplica();
                    oldReplica.setIsSold(false);
                    replicaRepository.save(oldReplica);

                    // Marcar nueva réplica como vendida
                    Replica newReplica = sale.getReplica();
                    newReplica.setIsSold(true);
                    replicaRepository.save(newReplica);
                }

                // Registrar evento de actualización
                SaleEvent event = SaleEvent.builder()
                        .sale(sale)
                        .timestamp(LocalDateTime.now())
                        .title("Venta actualizada")
                        .description("Actualización de datos de la venta")
                        .type("info")
                        .build();

                if (sale.getEvents() == null) {
                    sale.setEvents(new ArrayList<>(existingSale.get().getEvents()));
                }
                sale.getEvents().add(event);
            }
        }

        return saleRepository.save(sale);
    }

    /**
     * Elimina una venta por su ID
     * @param id Identificador de la venta a eliminar
     */
    @Transactional
    public void deleteById(Long id) {
        // Buscar la venta antes de eliminarla
        saleRepository.findById(id).ifPresent(sale -> {
            // Si tiene réplica, liberarla
            if (sale.getReplica() != null) {
                Replica replica = sale.getReplica();
                replica.setIsSold(false);
                replicaRepository.save(replica);
            }
        });

        saleRepository.deleteById(id);
    }

    /**
     * Obtiene las ventas más recientes
     * @return Lista de las 5 ventas más recientes
     */
    public List<Sale> findRecentSales() {
        return saleRepository.findTop5ByOrderByPurchaseDateDesc();
    }

    /**
     * Obtiene los juegos más populares por ventas
     * @return Lista de los juegos más vendidos con su cantidad
     */
    public List<PopularGameSalesDTO> findPopularGames() {
        return saleRepository.findTop5PopularGames();
    }

    /**
     * Obtiene las ventas agrupadas por mes
     * @return Estadísticas de ventas por mes
     */
    public List<SalesPerMonthDTO> findSalesPerMonth() {
        return saleRepository.findNumberSalesPerMonth();
    }

    /**
     * Cuenta el total de ventas
     * @return Número total de ventas
     */
    public long countAll() {
        return saleRepository.count();
    }



    public List<Sale> findByUser(User user) {
        return saleRepository.findByUserOrderByPurchaseDateDesc(user);
    }
}