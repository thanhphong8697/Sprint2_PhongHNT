package com.example.tproyalbe.DTO.productDTO;

import com.example.tproyalbe.DTO.cart.CartDetailDTO;


import java.util.Set;

public class ProductDTO {
    private Integer id;
    private String name;
    private Double price;
    private String description;
    private Integer quantity;
    private ProductTypeDTO productTypeDTO;
    private Set<ProductImgDTO> productImgDTOS;
    private Set<CartDetailDTO> cartDetailDTOS;
    private String size;
    private String material;

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public ProductDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public ProductTypeDTO getProductTypeDTO() {
        return productTypeDTO;
    }

    public void setProductTypeDTO(ProductTypeDTO productTypeDTO) {
        this.productTypeDTO = productTypeDTO;
    }

    public Set<ProductImgDTO> getProductImgDTOS() {
        return productImgDTOS;
    }

    public void setProductImgDTOS(Set<ProductImgDTO> productImgDTOS) {
        this.productImgDTOS = productImgDTOS;
    }

    public Set<CartDetailDTO> getCartDetailDTOS() {
        return cartDetailDTOS;
    }

    public void setCartDetailDTOS(Set<CartDetailDTO> cartDetailDTOS) {
        this.cartDetailDTOS = cartDetailDTOS;
    }
}
