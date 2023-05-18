package com.example.tproyalbe.DTO.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserMailDTO {
    @NotBlank(message = "Không được để trống")
    @Email(message = "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com")
    private String email;

    public UserMailDTO() {
        // TODO document why this constructor is empty
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
