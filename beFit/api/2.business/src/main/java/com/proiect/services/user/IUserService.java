package com.proiect.services.user;

import com.proiect.entities.User;

import java.util.Optional;

public interface IUserService {
    Optional<User> findByEmail(String email);
    Optional<User> findById(int id);
}
