package com.proiect.services.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UserAuthModel {
    @Email(message = "Email-ul nu este valid.")
    @NotNull(message = "Email-ul nu poate fi nul.")
    private String email;

    @Size(min = 5, max = 150, message
            = "Parola trebuie să aibă lungimea între 5 şi 150 de caractere.")
    @NotNull(message = "Parola nu poate fi nulă.")
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
