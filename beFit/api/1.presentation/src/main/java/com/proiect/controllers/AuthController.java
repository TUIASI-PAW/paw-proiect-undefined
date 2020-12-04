package com.proiect.controllers;

import com.proiect.entities.Role;
import com.proiect.entities.User;
import com.proiect.services.authentication.AuthenticationService;
import com.proiect.services.models.user.UserAuthModel;
import com.proiect.services.models.user.UserSignupModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private final AuthenticationService authenticationService;

    @Autowired
    private final ModelMapper modelMapper;

    public AuthController(AuthenticationService authenticationService, ModelMapper modelMapper) {
        this.authenticationService = authenticationService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/signin")
    public String login(@RequestBody UserAuthModel model) {
        return authenticationService.signin(model.getEmail(),model.getPassword());
    }

    @PostMapping("/signup")
    public String signup(@RequestBody UserSignupModel model) {
        model.setRoles(Arrays.asList(Role.ROLE_CLIENT));
        return authenticationService.signup(modelMapper.map(model, User.class));
    }

}
