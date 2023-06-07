package com.example.tproyalbe.service.cart.impl;

import com.example.tproyalbe.DTO.cart.CartDTO;
import com.example.tproyalbe.entity.cart.Cart;
import com.example.tproyalbe.repository.cart.ICartRepository;
import com.example.tproyalbe.service.cart.ICartDetailService;
import com.example.tproyalbe.service.cart.ICartService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements ICartService {
    @Autowired
    private ICartRepository iCartRepository;
    @Autowired
    private ICartDetailService iCartDetailService;

    @Override
    public void update(CartDTO cartDTO) {

        Cart cart = iCartRepository.findTheLastCart();
        cartDTO.setId(cart.getId());
        BeanUtils.copyProperties(cartDTO, cart);
        cart.setDelete(true);
        iCartDetailService.deleteAll(cart.getId());
        iCartRepository.save(cart);

    }
}