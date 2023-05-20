package com.example.tproyalbe.service.user.impl;

import com.example.tproyalbe.entity.user.Role;
import com.example.tproyalbe.repository.user.IRoleRepository;
import com.example.tproyalbe.service.user.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;
    @Override
    public Optional<Role> findByName(String name) {
        return roleRepository.findWithName(name);
    }
}