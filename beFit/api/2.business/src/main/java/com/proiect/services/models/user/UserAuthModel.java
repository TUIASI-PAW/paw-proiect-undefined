package com.proiect.services.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserAuthModel {
    @Email(message = "Email should be valid.")
    @NotNull(message = "Email cannot be null.")
    private String email;

    @Size(min = 3, max = 150, message
            = "Password must be between 3 and 50 characters.")
    @NotNull(message = "Password cannot be null.")
    private String password;

    public UserAuthModel() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
