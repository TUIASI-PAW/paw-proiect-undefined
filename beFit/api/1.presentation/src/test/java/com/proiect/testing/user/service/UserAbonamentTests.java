package com.proiect.testing.user.service;

import com.proiect.controllers.Boot;
import com.proiect.entities.User;
import com.proiect.exceptions.UserExceptions.UserNotFoundException;
import com.proiect.repositories.IAbonamentRepository;
import com.proiect.repositories.IUserRepository;
import com.proiect.services.abonament.IAbonamentService;
import com.proiect.services.authentication.IAuthenticationService;
import com.proiect.services.user.IUserAbonamentService;
import com.proiect.testing.TestAbonamenteProvider;
import com.proiect.testing.TestUsersProvider;
import org.junit.jupiter.api.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest(classes = Boot.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserAbonamentTests {
    private final int NOT_EXISTING_USER_ID = 99_999;
    private final int NOT_EXISTING_ABONAMENT_ID = 99_999;
    private int EXISTING_USER_ID;
    private int EXISTING_ABONAMENT_ID;
    @Autowired
    private IAuthenticationService authenticationService;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IAbonamentRepository abonamentRepository;
    @Autowired
    private IAbonamentService abonamentService;
    @Autowired
    private IUserAbonamentService userAbonamentService;
    @Autowired
    private ModelMapper modelMapper;

    @BeforeAll
    public void initializeData() {
        var user = userRepository.findByEmail(TestUsersProvider.SignUpModelWithCorrectFields().getEmail());
        if (user.isEmpty()) {
            var signupUser = modelMapper.map(TestUsersProvider.SignUpModelWithCorrectFields(), User.class);
            signupUser.setBalance(20_000);
            authenticationService.signup(signupUser);

            var userDao = userRepository.findByEmail(signupUser.getEmail());
            EXISTING_USER_ID = userDao.get().getId();
        } else EXISTING_USER_ID = user.get().getId();

        var ab = abonamentRepository.findByTitle(TestAbonamenteProvider.getAbonamentModel().getTitle());
        if (ab.isEmpty()) {
            var abonament = abonamentService.insert(TestAbonamenteProvider.getAbonamentModel());
            EXISTING_ABONAMENT_ID = abonament.getId();
        } else EXISTING_ABONAMENT_ID = ab.get().getId();

    }

    @Test
    @Order(1)
    public void add_then_remove_test() {
        userAbonamentService.add(EXISTING_USER_ID, EXISTING_ABONAMENT_ID);
        userAbonamentService.remove(EXISTING_USER_ID, EXISTING_ABONAMENT_ID);
    }

    @Test
    @Order(2)
    public void fail_add_test() {
        Assertions.assertThrows(UserNotFoundException.class, () -> userAbonamentService.add(NOT_EXISTING_USER_ID, NOT_EXISTING_ABONAMENT_ID));
    }

    @Test
    @Order(3)
    public void fail_remove_test() {
        Assertions.assertThrows(UserNotFoundException.class, () -> userAbonamentService.remove(NOT_EXISTING_USER_ID, NOT_EXISTING_ABONAMENT_ID));
    }
}
