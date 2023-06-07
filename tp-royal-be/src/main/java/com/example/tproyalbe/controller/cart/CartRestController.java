package com.example.tproyalbe.controller.cart;

import com.example.tproyalbe.DTO.cart.CartDTO;
import com.example.tproyalbe.service.cart.ICartService;
import com.example.tproyalbe.service.cart.impl.CartDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartRestController {
    @Autowired
    private CartDetailServiceImpl cartDetailService;
    @Autowired
    private ICartService iCartService;
    @PutMapping("")
    public ResponseEntity<Void> updateCart (@RequestBody CartDTO cartDTO) {
        iCartService.update(cartDTO);
        cartDetailService.resetCount();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}