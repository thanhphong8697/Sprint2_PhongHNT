package com.example.tproyalbe.repository.product;

import com.example.tproyalbe.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface IProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findProductsByNameContaining(Pageable pageable, String name);
}
