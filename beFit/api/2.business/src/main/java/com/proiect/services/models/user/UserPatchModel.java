package com.proiect.services.models.user;

import org.springframework.lang.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserPatchModel {
    @Size(min = 3, max = 30, message
            = "First name must be between 3 and 30 characters.")
    private String firstname;

    @Size(min = 3, max = 30, message
            = "Last name must be between 3 and 30 characters.")
    private String lastname;

    @Email(message = "Email should be valid.")
    private String email;

    @Size(min = 10, max = 10, message
            = "Phone number must have 10 characters.")
    private String phone;

    @Size(min = 3, max = 150, message
            = "Password must be between 3 and 50 characters.")
    private String password;

    @Size(min = 3, max = 150, message
            = "Password must be between 3 and 50 characters.")
    private String newPassword;

    public UserPatchModel() {
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

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
