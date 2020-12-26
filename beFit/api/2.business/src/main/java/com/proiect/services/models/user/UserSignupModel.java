package com.proiect.services.models.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proiect.entities.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class UserSignupModel {
    @Size(min = 3, max = 30, message
            = "Prenumele trebuie să aibă lungimea între 3 şi 30 de caractere")
    @NotNull(message = "Prenumele nu poate fi nul.")
    private String firstname;

    @Size(min = 3, max = 30, message
            = "Numele trebuie să aibă lungimea între 3 şi 30 de caractere")
    @NotNull(message = "Numele nu poate fi nul.")
    private String lastname;

    @Email(message = "Email-ul nu este valid.")
    @NotNull(message = "Email-ul nu poate fi nul.")
    private String email;

    @Size(min = 10, max = 10,
            message = "Numărul de telefon trebuie să conţină 10 caractere.")
    @NotNull(message = "Numărul de telefon nu poate fi nul.")
    private String phone;

    @Size(min = 5, max = 150, message
            = "Parola trebuie să aibă lungimea între 5 şi 150 de caractere.")
    @NotNull(message = "Parola nu poate fi nulă.")
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
