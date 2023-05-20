package com.example.tproyalbe.repository.user;

import com.example.tproyalbe.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IRoleRepository extends JpaRepository<Role, Integer> {
    @Query(value = "select * from roles where name = :name", nativeQuery = true)
    Optional<Role> findWithName (@Param("name") String name);
}