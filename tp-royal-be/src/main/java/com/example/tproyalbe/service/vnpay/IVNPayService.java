package com.example.tproyalbe.service.vnpay;

import com.example.tproyalbe.DTO.payment.PaymentSendEmailDTO;

public interface IVNPayService {
    void sendEmail(PaymentSendEmailDTO paymentSendEmailDTO);
}