package com.proiect.services.models.user;

import com.proiect.entities.Role;
import io.swagger.annotations.ApiModelProperty;

import java.util.List;

public class UserResponseModel {

    @ApiModelProperty(position = 3)
    List<Role> roles;
    @ApiModelProperty(position = 0)
    private Integer id;
    @ApiModelProperty(position = 2)
    private String email;

    public UserResponseModel() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

}
