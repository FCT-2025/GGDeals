package com.ggdeal.service;

import com.ggdeal.model.Cart;
import com.ggdeal.model.User;
import com.ggdeal.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Optional<Cart> findByUser(User user) {
        return cartRepository.findByUser(user);
    }

    public void clearCart(User user) {
        Optional<Cart> cartOpt = findByUser(user);
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            cart.getItems().clear();
            cartRepository.save(cart);
        }
    }
}
