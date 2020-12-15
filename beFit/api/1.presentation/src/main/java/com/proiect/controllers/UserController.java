package com.proiect.controllers;

import com.proiect.entities.User;
import com.proiect.services.user.IUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id)
    {
        return userService.findById(id).orElseThrow(()-> new RuntimeException("EXCEPTIE"));
    }
}
