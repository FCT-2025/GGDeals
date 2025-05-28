package com.ggdeal.controller.admin;

import com.ggdeal.dto.SaleDTO;
import com.ggdeal.model.Replica;
import com.ggdeal.model.Sale;
import com.ggdeal.model.SaleEvent;
import com.ggdeal.model.User;
import com.ggdeal.repository.SaleEventRepository;
import com.ggdeal.service.ReplicaService;
import com.ggdeal.service.SaleService;
import com.ggdeal.service.StatisticsService;
import com.ggdeal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api/admin/sales")
public class AdminSalesController {

    private final SaleService saleService;
    private final UserService userService;
    private final ReplicaService replicaService;
    private final StatisticsService statisticsService;
    private final SaleEventRepository saleEventRepository;

    @Autowired
    public AdminSalesController(SaleService saleService,
                                UserService userService,
                                ReplicaService replicaService,
                                StatisticsService statisticsService,
                                SaleEventRepository saleEventRepository) {
        this.saleService = saleService;
        this.userService = userService;
        this.replicaService = replicaService;
        this.statisticsService = statisticsService;
        this.saleEventRepository = saleEventRepository;
    }

    @GetMapping
    public String getSalesPage(Model model) {
        // Obtener todas las ventas
        List<Sale> sales = saleService.findAll();
        model.addAttribute("sales", sales);

        // Obtener usuarios para selector
        List<User> users = userService.findAll();
        model.addAttribute("users", users);

        // Obtener réplicas disponibles (no vendidas)
        List<Replica> availableReplicas = replicaService.findByIsSold(false);
        model.addAttribute("availableReplicas", availableReplicas);

        // Obtener todas las réplicas para edición
        List<Replica> allReplicas = replicaService.findAll();
        model.addAttribute("allReplicas", allReplicas);

        // Obtener estadísticas
        Map<String, Object> statistics = statisticsService.getSalesStatistics();
        model.addAttribute("statistics", statistics);

        // Obtener ventas por categoría
        Map<String, Object> categorySales = statisticsService.getCategorySales();
        model.addAttribute("categorySales", categorySales);

        return "admin/sales";
    }

    // API para crear una venta
    @PostMapping
    @ResponseBody
    public ResponseEntity<?> createSale(@RequestBody SaleDTO saleDTO) {
        try {
            Sale sale = new Sale();

            // Configurar fecha
            if (saleDTO.getPurchaseDate() != null) {
                sale.setPurchaseDate(saleDTO.getPurchaseDate());
            } else {
                sale.setPurchaseDate(LocalDateTime.now());
            }

            // Configurar la venta según el DTO
            if (saleDTO.getUserId() != null) {
                try {
                    sale.setUser(userService.findById(saleDTO.getUserId()));
                } catch (RuntimeException e) {
                    return ResponseEntity.badRequest().body("Usuario no encontrado: " + e.getMessage());
                }
            }

            if (saleDTO.getReplicaId() != null) {
                Optional<Replica> replicaOpt = replicaService.findById(saleDTO.getReplicaId());
                if (replicaOpt.isPresent()) {
                    Replica replica = replicaOpt.get();
                    if (replica.getIsSold()) {
                        return ResponseEntity.badRequest().body("La réplica ya está vendida");
                    }
                    sale.setReplica(replica);

                    // Marcar réplica como vendida
                    replica.setIsSold(true);
                    replicaService.save(replica);
                } else {
                    return ResponseEntity.badRequest().body("Réplica no encontrada");
                }
            } else {
                return ResponseEntity.badRequest().body("ID de réplica es obligatorio");
            }

            sale.setAmount(saleDTO.getAmount());
            sale.setStatus(saleDTO.getStatus());
            sale.setPaymentMethod(saleDTO.getPaymentMethod());

            Sale savedSale = saleService.save(sale);

            // Registrar evento de venta
            SaleEvent event = SaleEvent.builder()
                    .sale(savedSale)
                    .timestamp(LocalDateTime.now())
                    .title("Venta creada")
                    .description("Venta registrada correctamente")
                    .type("success")
                    .build();

            // Añadir el evento a la venta
            if (savedSale.getEvents() == null) {
                savedSale.setEvents(new ArrayList<>());
            }
            savedSale.getEvents().add(event);
            saleService.save(savedSale);

            // Devolver mapa simplificado en lugar del objeto completo
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedSale.getId());
            response.put("purchaseDate", savedSale.getPurchaseDate());
            response.put("amount", savedSale.getAmount());
            response.put("status", savedSale.getStatus());
            response.put("userId", savedSale.getUser() != null ? savedSale.getUser().getId() : null);
            response.put("replicaId", savedSale.getReplica() != null ? savedSale.getReplica().getId() : null);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API para actualizar una venta
    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> updateSale(@PathVariable Long id, @RequestBody SaleDTO saleDTO) {
        try {
            if (!id.equals(saleDTO.getId())) {
                return ResponseEntity.badRequest().body("ID en URL no coincide con ID en datos");
            }

            Optional<Sale> existingSaleOpt = saleService.findById(id);
            if (existingSaleOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Sale sale = existingSaleOpt.get();

            // Manejar cambio de estado
            String oldStatus = sale.getStatus();
            String newStatus = saleDTO.getStatus();

            if (!oldStatus.equals(newStatus)) {
                // Si cambia a cancelada o reembolsada, liberar la réplica
                if ((newStatus.equals("cancelled") || newStatus.equals("refunded")) &&
                        sale.getReplica() != null && sale.getReplica().getIsSold()) {
                    Replica replica = sale.getReplica();
                    replica.setIsSold(false);
                    replicaService.save(replica);

                    // Registrar evento de cambio de estado
                    SaleEvent event = SaleEvent.builder()
                            .sale(sale)
                            .timestamp(LocalDateTime.now())
                            .title("Estado cambiado")
                            .description("Estado cambiado de " + oldStatus + " a " + newStatus)
                            .type("info")
                            .build();

                    // Añadir el evento a la venta
                    if (sale.getEvents() == null) {
                        sale.setEvents(new ArrayList<>());
                    }
                    sale.getEvents().add(event);
                }
            }

            // Actualizar campos
            if (saleDTO.getPurchaseDate() != null) {
                sale.setPurchaseDate(saleDTO.getPurchaseDate());
            }

            if (saleDTO.getAmount() != null) {
                sale.setAmount(saleDTO.getAmount());
            }

            if (saleDTO.getStatus() != null) {
                sale.setStatus(saleDTO.getStatus());
            }

            if (saleDTO.getUserId() != null) {
                try {
                    sale.setUser(userService.findById(saleDTO.getUserId()));
                } catch (RuntimeException e) {
                    return ResponseEntity.badRequest().body("Usuario no encontrado: " + e.getMessage());
                }
            }

            if (saleDTO.getReplicaId() != null &&
                    (sale.getReplica() == null || !sale.getReplica().getId().equals(saleDTO.getReplicaId()))) {

                // Liberar réplica anterior si existe
                if (sale.getReplica() != null) {
                    Replica oldReplica = sale.getReplica();
                    oldReplica.setIsSold(false);
                    replicaService.save(oldReplica);
                }

                // Asignar nueva réplica
                Optional<Replica> replicaOpt = replicaService.findById(saleDTO.getReplicaId());
                if (replicaOpt.isPresent()) {
                    Replica newReplica = replicaOpt.get();
                    if (newReplica.getIsSold() &&
                            (sale.getReplica() == null || !sale.getReplica().getId().equals(newReplica.getId()))) {
                        return ResponseEntity.badRequest().body("La nueva réplica ya está vendida");
                    }
                    sale.setReplica(newReplica);
                    newReplica.setIsSold(true);
                    replicaService.save(newReplica);
                } else {
                    return ResponseEntity.badRequest().body("Réplica no encontrada");
                }
            }

            Sale updatedSale = saleService.save(sale);

            // Respuesta simplificada
            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedSale.getId());
            response.put("purchaseDate", updatedSale.getPurchaseDate());
            response.put("amount", updatedSale.getAmount());
            response.put("status", updatedSale.getStatus());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Agrega un método alternativo con POST
    @PostMapping("/{id}/delete")
    @ResponseBody
    public ResponseEntity<?> deleteSaleWithPost(@PathVariable Long id) {
        return deleteSale(id);
    }

    // API para eliminar una venta
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSale(@PathVariable Long id) {
        try {
            // Verificar si la venta existe usando findById en lugar de existsById
            Optional<Sale> saleOpt = saleService.findById(id);
            if (saleOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            // Liberar réplica si existe
            Sale sale = saleOpt.get();
            if (sale.getReplica() != null) {
                Replica replica = sale.getReplica();
                replica.setIsSold(false);
                replicaService.save(replica);
            }

            // Eliminar primero los eventos para evitar el TransientObjectException
            if (sale.getEvents() != null && !sale.getEvents().isEmpty()) {
                saleEventRepository.deleteBySaleId(id);
            }

            // Finalmente eliminar la venta
            saleService.deleteById(id);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar la venta: " + e.getMessage());
        }
    }

    // API para obtener eventos de una venta
    @GetMapping("/{id}/events")
    @ResponseBody
    public ResponseEntity<?> getSaleEvents(@PathVariable Long id) {
        try {
            Optional<Sale> saleOpt = saleService.findById(id);
            if (saleOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            List<SaleEvent> events = saleOpt.get().getEvents();
            return ResponseEntity.ok(events != null ? events : new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}