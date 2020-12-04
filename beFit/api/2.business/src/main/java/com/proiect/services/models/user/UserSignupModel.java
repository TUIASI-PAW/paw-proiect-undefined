package com.proiect.services.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proiect.entities.Role;

import java.util.List;

public class UserSignupModel {
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String password;
    @JsonIgnore
    private List<Role> roles;

    public UserSignupModel() {
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
