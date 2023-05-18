package com.example.tproyalbe.service.user.impl;

import com.example.tproyalbe.entity.user.User;
import com.example.tproyalbe.repository.user.IUserRepository;
import com.example.tproyalbe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    IUserRepository iUserRepository;
    @Autowired
    @Lazy
    PasswordEncoder passwordEncoder;

    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to find username
     *
     * @param name
     * @return Employee
     */
    @Override
    public Optional<User> findByUsername(String name) {
        return iUserRepository.findByUsername(name);
    }

    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check username exists or not
     *
     * @param username
     * @return If username exists, return true, else false
     */
    @Override
    public Boolean existsByUsername(String username) {
        return iUserRepository.existsByUserName(username);
    }

    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check email exists or not
     *
     * @param email
     * @return If email exists, return true, else false
     */
    @Override
    public Boolean existsByEmail(String email) {
        return iUserRepository.existsByEmail(email);
    }

    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check password exists or not
     *
     * @param oldPassword
     * @param
     * @return If password exists, return true, else false
     */
    @Override
    public Boolean checkIfValidOldPassword(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to change password
     *
     * @param
     * @param newPassword
     * @return void
     */
    @Override
    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        iUserRepository.updatePassword(user.getPassword(), user.getId());
    }

    @Override
    public List<User> getAll() {
        return iUserRepository.getAll();
    }


    @Override
    public User findByEmailUser(String email) {
        return iUserRepository.findByEmailUser(email);
    }

    @Override
    public void updateOtp(User user) {
        iUserRepository.updateOtp(user.getExpiryTime(), user.getOtpSecret(), user.getEmail());
    }
}

