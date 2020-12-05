package com.proiect.controllers;

import com.proiect.entities.Role;
import com.proiect.entities.User;
import com.proiect.services.authentication.AuthenticationService;
import com.proiect.services.models.user.UserAuthModel;
import com.proiect.services.models.user.UserSignupModel;
import com.proiect.services.models.user.UserTokenModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@CrossOrigin
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
    public UserTokenModel login(@Validated @RequestBody UserAuthModel model) {
        var token = authenticationService.signin(model.getEmail(),model.getPassword());
        return new UserTokenModel(token);
    }

    @PostMapping("/signup")
    public String signup(@Validated @RequestBody UserSignupModel model) {
        model.setRoles(Arrays.asList(Role.ROLE_CLIENT));
        return authenticationService.signup(modelMapper.map(model, User.class));
    }

}
