package com.example.tproyalbe.service.user;

import com.example.tproyalbe.entity.user.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> findByName (String name);
}
