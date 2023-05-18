package com.example.tproyalbe.service.user;

import com.example.tproyalbe.entity.user.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to find username
     * @param name
     * @return Employee
     *
     */
    Optional<User> findByUsername(String name);
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check username exists or not
     * @param username
     * @return
     * If username exists, return true, else false
     */
    Boolean existsByUsername(String username);
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check email exists or not
     * @param email
     * @return
     * If email exists, return true, else false
     */
    Boolean existsByEmail(String email);
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check password exists or not
     * @param oldPassword
     * @param
     * @return
     * If password exists, return true, else false
     */
    Boolean checkIfValidOldPassword(User user, String oldPassword);
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to change password
     * @param
     * @param newPassword
     * @return void
     */
    void changeUserPassword(User user,String newPassword);

    User findByEmailUser(String email);

    void updateOtp(User user);
    List<User> getAll();
}
