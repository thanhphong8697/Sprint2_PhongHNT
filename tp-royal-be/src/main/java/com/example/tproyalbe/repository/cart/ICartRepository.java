package com.example.tproyalbe.repository.cart;

import com.example.tproyalbe.entity.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ICartRepository extends JpaRepository<Cart, Integer> {
    @Query(value = "SELECT * FROM cart ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Cart findTheLastCart();

    Cart findByCodeContaining(String code);
}