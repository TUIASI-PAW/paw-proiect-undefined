package com.proiect.services.authentication;

import com.proiect.entities.User;

public interface IAuthenticationService {
    String signin(String username, String password);

    String signup(User user);
}
