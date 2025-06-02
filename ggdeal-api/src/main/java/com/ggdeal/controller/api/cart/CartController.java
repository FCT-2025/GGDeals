package com.ggdeal.controller.api.cart;
import com.ggdeal.configuration.JwtProvider;
import com.ggdeal.dto.admin.UserDTO;
import com.ggdeal.dto.api.CartDTO;
import com.ggdeal.dto.api.CartItemDTO;
import com.ggdeal.model.*;
import com.ggdeal.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ReplicaRepository replicaRepository;

    // Obtener carrito del usuario
    @GetMapping
    public ResponseEntity<?> getCart(HttpServletRequest request) {
        // Validación de usuario
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

        // Obtener o crear carrito
        Cart cart = getOrCreateCart(user);
        CartDTO cartDTO = convertToCartDTO(cart);

        return ResponseEntity.ok(cartDTO);
    }

    // Agregar item al carrito
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> requestBody, HttpServletRequest request) {
        // Validación de usuario
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

        try {
            Long replicaId = Long.valueOf(requestBody.get("replicaId").toString());
            Integer quantity = Integer.valueOf(requestBody.get("quantity").toString());

            // Validar que la réplica existe y no está vendida
            Optional<Replica> replicaOpt = replicaRepository.findById(replicaId);
            if (replicaOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Réplica no encontrada"));
            }

            Replica replica = replicaOpt.get();
            if (replica.getIsSold()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Esta réplica ya está vendida"));
            }

            // Obtener o crear carrito
            Cart cart = getOrCreateCart(user);

            // Verificar si el item ya existe en el carrito
            Optional<CartItem> existingItem = cart.getItems().stream()
                    .filter(item -> item.getReplica().getId().equals(replicaId))
                    .findFirst();

            if (existingItem.isPresent()) {
                // Actualizar cantidad
                CartItem item = existingItem.get();
                item.setQuantity(item.getQuantity() + quantity);
                cartItemRepository.save(item);
            } else {
                // Crear nuevo item
                CartItem newItem = new CartItem();
                newItem.setCart(cart);
                newItem.setReplica(replica);
                newItem.setQuantity(quantity);
                cartItemRepository.save(newItem);
            }

            return ResponseEntity.ok(Map.of("message", "Item agregado al carrito"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error al agregar item al carrito"));
        }
    }

    // Actualizar cantidad de un item
    @PutMapping("/update/{itemId}")
    public ResponseEntity<?> updateCartItem(@PathVariable Long itemId,
                                            @RequestBody Map<String, Integer> requestBody,
                                            HttpServletRequest request) {
        // Validación de usuario
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

        try {
            Integer newQuantity = requestBody.get("quantity");

            Optional<CartItem> itemOpt = cartItemRepository.findById(itemId);
            if (itemOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Item no encontrado"));
            }

            CartItem item = itemOpt.get();

            // Verificar que el item pertenece al usuario
            if (!item.getCart().getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "No tienes permisos para modificar este item"));
            }

            if (newQuantity <= 0) {
                cartItemRepository.delete(item);
                return ResponseEntity.ok(Map.of("message", "Item eliminado del carrito"));
            } else {
                item.setQuantity(newQuantity);
                cartItemRepository.save(item);
                return ResponseEntity.ok(Map.of("message", "Item actualizado"));
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error al actualizar item"));
        }
    }

    // Eliminar item del carrito
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long itemId, HttpServletRequest request) {
        // Validación de usuario
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

        try {
            Optional<CartItem> itemOpt = cartItemRepository.findById(itemId);
            if (itemOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Item no encontrado"));
            }

            CartItem item = itemOpt.get();

            // Verificar que el item pertenece al usuario
            if (!item.getCart().getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "No tienes permisos para eliminar este item"));
            }

            cartItemRepository.delete(item);
            return ResponseEntity.ok(Map.of("message", "Item eliminado del carrito"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error al eliminar item"));
        }
    }

    // Vaciar carrito completo
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(HttpServletRequest request) {
        // Validación de usuario
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

        try {
            Cart cart = getOrCreateCart(user);
            cart.getItems().clear();
            cartRepository.save(cart);
            return ResponseEntity.ok(Map.of("message", "Carrito vaciado"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error al vaciar carrito"));
        }
    }

    // Obtener resumen del carrito (cantidad total y precio)
    @GetMapping("/summary")
    public ResponseEntity<?> getCartSummary(HttpServletRequest request) {
        // Validación de usuario
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

        try {
            Cart cart = getOrCreateCart(user);

            int totalItems = cart.getItems().stream()
                    .mapToInt(CartItem::getQuantity)
                    .sum();

            // Aquí asumiendo que tienes un precio en Game o Edition
            // Double totalPrice = cart.getItems().stream()
            //         .mapToDouble(item -> item.getReplica().getGame().getPrice() * item.getQuantity())
            //         .sum();

            Map<String, Object> summary = Map.of(
                    "totalItems", totalItems,
                    "itemCount", cart.getItems().size()
                    // "totalPrice", totalPrice
            );

            return ResponseEntity.ok(summary);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error al obtener resumen del carrito"));
        }
    }

    // Métodos auxiliares
    private Cart getOrCreateCart(User user) {
        if (user.getCart() == null) {
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setItems(List.of());
            return cartRepository.save(cart);
        }
        return user.getCart();
    }

    private CartDTO convertToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());

        List<CartItemDTO> itemDTOs = cart.getItems().stream()
                .map(this::convertToCartItemDTO)
                .collect(Collectors.toList());

        cartDTO.setItems(itemDTOs);
        return cartDTO;
    }

    private CartItemDTO convertToCartItemDTO(CartItem item) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(item.getId());
        dto.setReplicaId(item.getReplica().getId());
        dto.setQuantity(item.getQuantity());
        dto.setGameName(item.getReplica().getGame().getTitle());
        if(item.getReplica().getEdition() != null) {
            dto.setPrice(item.getReplica().getEdition().getPrice().floatValue());
        } else {
            dto.setPrice(item.getReplica().getGame().getPrice());
        }


        return dto;
    }
}