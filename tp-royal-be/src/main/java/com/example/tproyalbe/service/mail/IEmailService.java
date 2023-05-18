package com.example.tproyalbe.service.mail;
import com.example.tproyalbe.entity.user.User;

public interface IEmailService {
    void sendResetPasswordEmail(String email, String otp);
    boolean validateOtp(String otpCode, String email);
    String generateOtp(User user);

}
