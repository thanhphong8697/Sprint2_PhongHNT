package com.example.tproyalbe.DTO.user;

import com.example.tproyalbe.entity.user.RoleName;
import java.util.HashSet;
import java.util.Set;

public class RoleDTO {
    private Integer id;

    private RoleName name;
    Set<UserDetailDTO> userDetailDTOS = new HashSet<>();
    public RoleDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RoleName getName() {
        return name;
    }

    public void setName(RoleName name) {
        this.name = name;
    }

    public Set<UserDetailDTO> getUserDetailDTOS() {
        return userDetailDTOS;
    }

    public void setUserDetailDTOS(Set<UserDetailDTO> userDetailDTOS) {
        this.userDetailDTOS = userDetailDTOS;
    }
}
