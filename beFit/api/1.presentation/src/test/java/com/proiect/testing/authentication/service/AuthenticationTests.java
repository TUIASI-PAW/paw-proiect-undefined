package com.proiect.testing.authentication.service;


import com.proiect.controllers.Boot;
import com.proiect.entities.User;
import com.proiect.repositories.IUserRepository;
import com.proiect.services.authentication.IAuthenticationService;
import com.proiect.testing.TestUsersProvider;
import org.junit.jupiter.api.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.TransactionSystemException;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = Boot.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AuthenticationTests {

    @Autowired
    private IAuthenticationService authenticationService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IUserRepository userRepository;

    @BeforeAll
    public void deleteExistingUser() {
        var user = userRepository.findByEmail(TestUsersProvider.SignUpModelWithCorrectFields().getEmail());
        if (user.isPresent())
            userRepository.delete(user.get());
    }

    @Test
    @Order(1)
    public void sign_up_test() {
        var model = TestUsersProvider.SignUpModelWithCorrectFields();
        var user = modelMapper.map(model, User.class);

        var token = authenticationService.signup(user);
        assertNotEquals(token, "");
        assertNotNull(token);
    }

    @Test
    @Order(2)
    public void sign_in_test() {
        var model = TestUsersProvider.SignUpModelWithCorrectFields();
        var token = authenticationService.signin(model.getEmail(), model.getPassword());
        assertNotEquals(token, "");
        assertNotNull(token);
    }

    @Test
    @Order(3)
    public void fail_sign_up_test() {
        var model = TestUsersProvider.SignUpModelWithIncorrectFields();
        Assertions.assertThrows(TransactionSystemException.class, () -> authenticationService.signup(modelMapper.map(model, User.class)));
    }

    @Test
    @Order(4)
    public void fail_sign_in_test() {
        var model = TestUsersProvider.SignUpModelWithIncorrectFields();
        Assertions.assertThrows(BadCredentialsException.class, () -> authenticationService.signin(model.getEmail(), model.getPassword()));
    }
}
