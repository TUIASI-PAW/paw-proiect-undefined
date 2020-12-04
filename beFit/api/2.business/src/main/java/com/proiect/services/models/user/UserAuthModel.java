package com.proiect.services.models.user;

public class UserAuthModel {
    private String email;
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
