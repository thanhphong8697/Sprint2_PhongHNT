package com.example.tproyalbe.security;
import com.example.tproyalbe.entity.user.User;
import com.example.tproyalbe.repository.user.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepository iUserRepository;


    /**
     * QuanNLA
     * DATE 24/04/2023
     * User authentication method
     *
     * @param username the username identifying the user whose data is required.
     * @return the user's details (including username, password and role)
     * @throws
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = iUserRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Không tìm thấy tên người dùng"+username));
        return UserPrinciple.build(user);
    }

}