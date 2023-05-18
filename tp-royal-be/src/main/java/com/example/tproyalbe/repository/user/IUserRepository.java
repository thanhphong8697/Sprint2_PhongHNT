package com.example.tproyalbe.repository.user;

import com.example.tproyalbe.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IUserRepository extends JpaRepository<User, Integer> {
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to find username
     * @param username
     * @return Employee
     *
     */
    @Query(value = "select * from user u \n" +
            "join roles_user on user_id = u.id \n" +
            "join roles r on r.id = role_id\n" +
            "where user_name = :username", nativeQuery = true)
    Optional<User> findByUsername(@Param("username") String username);
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check username exists or not
     * @param username
     * @return
     * If username exists, return true, else false
     */
    @Query(value = "SELECT IF(EXISTS(SELECT * FROM user WHERE user_name = :username), 'true', 'false')", nativeQuery = true)
    Boolean existsByUserName(@Param("username") String username);
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to check email exists or not
     * @param email
     * @return
     * If email exists, return true, else false
     */
    @Query(value = "SELECT IF(EXISTS(SELECT * FROM user WHERE email = :email), 'true', 'false')", nativeQuery = true)
    Boolean existsByEmail(@Param("email") String email);
    /**
     * QuanNLA
     * Date 24/04/2023
     * Method to change password
     * @param id
     * @param newPassword
     * @return void
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET password = :newPassword WHERE id = :id",nativeQuery = true)
    void updatePassword(@Param("newPassword")String newPassword,@Param("id")Integer id);
    @Modifying
    @Query(value = "select *  from user   ", nativeQuery = true)
    List<User> getAll();



    @Query(value = "SELECT * FROM employee WHERE email = :email", nativeQuery = true)
    User findByEmailUser(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE employee set expiry_time = :expiryTime , otp_secret = :otpSecret where email = :email",nativeQuery = true)
    void updateOtp(@Param("expiryTime") LocalDateTime expiryTime, @Param("otpSecret")String otpSecret, @Param("email")String email);
}