package com.example.tproyalbe.service.product;

import com.example.tproyalbe.DTO.productDTO.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<ProductDTO> findByName(Pageable pageable, String name);
    ProductDTO findById(Integer id);
    Page<ProductDTO> findAll(Pageable pageable);
}
