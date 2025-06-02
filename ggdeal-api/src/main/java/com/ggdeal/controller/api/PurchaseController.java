package com.ggdeal.controller.api;

import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.dto.admin.UserDTO;
import com.ggdeal.dto.api.ActivationKeyDTO;
import com.ggdeal.dto.api.PurchaseResponseDTO;
import com.ggdeal.model.*;
import com.ggdeal.repository.UserRepository;
import com.ggdeal.service.CartService;
import com.ggdeal.service.ReplicaService;
import com.ggdeal.service.SaleService;
import com.ggdeal.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PurchaseController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private ReplicaService replicaService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private SaleService saleService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/purchase")
    public ResponseEntity<?> processPurchase(HttpServletRequest request) {
        try {
            String token = jwtProvider.getTokenFromCookie(request);
            if (token == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
            }

            UserDTO userDTO = jwtProvider.validateToken(token);
            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
            }

            User user = userRepository.findById(userDTO.getId()).get();
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuario no encontrado"));
            }


            // Obtener carrito del usuario
            Optional<Cart> cartOpt = cartService.findByUser(user);
            if (!cartOpt.isPresent() || cartOpt.get().getItems().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new PurchaseResponseDTO(false, "El carrito está vacío", null));
            }

            Cart cart = cartOpt.get();
            List<CartItem> cartItems = cart.getItems();

            // Validar disponibilidad de todas las réplicas antes de procesar
            List<Replica> replicasToProcess = new ArrayList<>();
            double totalAmount = 0.0;

            for (CartItem item : cartItems) {
                // Obtener réplicas disponibles para este juego
                List<Replica> availableReplicas = replicaService.findAvailableReplicasByGame(
                        item.getReplica().getGame().getId(), item.getQuantity()
                );

                if (availableReplicas.size() < item.getQuantity()) {
                    return ResponseEntity.badRequest()
                            .body(new PurchaseResponseDTO(false,
                                    "No hay suficientes copias disponibles de " + item.getReplica().getGame().getTitle(),
                                    null));
                }

                replicasToProcess.addAll(availableReplicas.subList(0, item.getQuantity()));

                // Calcular precio (usando el precio de la edición)
                double itemPrice;
                if(item.getReplica().getEdition() != null) {
                    itemPrice= item.getReplica().getEdition().getPrice().doubleValue();
                }else {
                    itemPrice =  item.getReplica().getGame().getPrice();
                }
                totalAmount += (itemPrice * item.getQuantity());
            }

            // Verificar saldo del usuario (si tienes sistema de créditos)
            if (user.getAmount() != null && user.getAmount() < totalAmount) {
                return ResponseEntity.badRequest()
                        .body(new PurchaseResponseDTO(false, "Saldo insuficiente", null));
            }

            // Procesar la compra - crear ventas y marcar réplicas como vendidas
            List<ActivationKeyDTO> activationKeys = new ArrayList<>();

            for (Replica replica : replicasToProcess) {
                // Marcar réplica como vendida
                replica.setIsSold(true);
                replicaService.save(replica);
                double amount;
                if(replica.getEdition() != null) {
                    amount = replica.getEdition().getPrice().doubleValue();
                }else {
                    amount =  replica.getGame().getPrice();
                }
                // Crear venta
                Sale sale = Sale.builder()
                        .user(user)
                        .replica(replica)
                        .amount(amount)
                        .purchaseDate(LocalDateTime.now())
                        .status("completed")
                        .paymentMethod("balance")
                        .build();

                saleService.save(sale);

                // Agregar clave de activación a la respuesta
                String gameName = replica.getGame().getTitle();
                String existingGameName = null;
                ActivationKeyDTO existingKey = null;

                // Buscar si ya existe una entrada para este juego
                for (ActivationKeyDTO keyDto : activationKeys) {
                    if (keyDto.getGameName().equals(gameName)) {
                        existingKey = keyDto;
                        break;
                    }
                }

                if (existingKey != null) {
                    // Si ya existe, agregar la clave y aumentar la cantidad
                    existingKey.setActivationKey(existingKey.getActivationKey() + "\n" + replica.getActivationKey());
                    existingKey.setQuantity(existingKey.getQuantity() + 1);
                } else {
                    // Si no existe, crear nueva entrada
                    activationKeys.add(new ActivationKeyDTO(
                            gameName,
                            replica.getActivationKey(),
                            1
                    ));
                }
            }

            // Actualizar saldo del usuario (restar el monto de la compra)
            if (user.getAmount() != null) {
                user.updateBalance(-((float) totalAmount));
                userService.save(user);
            }

            // Limpiar carrito después de compra exitosa
            cartService.clearCart(user);

            // Crear respuesta exitosa
            PurchaseResponseDTO response = new PurchaseResponseDTO(
                    true,
                    "Compra procesada exitosamente",
                    activationKeys
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new PurchaseResponseDTO(false, "Error interno del servidor: " + e.getMessage(), null));
        }
    }

    @GetMapping("/purchase/history")
    public ResponseEntity<?> getPurchaseHistory(HttpServletRequest request) {
        try {
            String token = jwtProvider.getTokenFromCookie(request);
            if (token == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
            }

            UserDTO userDTO = jwtProvider.validateToken(token);
            if (userDTO == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No tienes permisos"));
            }

            User user = userRepository.findById(userDTO.getId()).get();
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Usuario no encontrado"));
            }

            List<Sale> purchases = saleService.findByUser(user);

            return ResponseEntity.ok(purchases);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
