package com.proiect.services.models.user;

public class UserTokenModel {
    private String token;

    public UserTokenModel() {
    }

    public UserTokenModel(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
