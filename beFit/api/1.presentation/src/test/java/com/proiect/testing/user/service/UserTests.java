package com.proiect.testing.user.service;

import com.proiect.controllers.Boot;
import com.proiect.entities.User;
import com.proiect.repositories.IUserRepository;
import com.proiect.services.authentication.IAuthenticationService;
import com.proiect.services.user.IUserService;
import com.proiect.testing.TestUsersProvider;
import org.junit.jupiter.api.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.event.annotation.BeforeTestClass;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = Boot.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class UserTests {

    private int EXISTING_USER_ID;
    private final int NOT_EXISTING_USER_ID = 99_999;

    @Autowired
    private IUserService userService;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IAuthenticationService authenticationService;

    @Autowired
    private ModelMapper modelMapper;

    @BeforeAll
    public void initializeData(){
        var user = userRepository.findByEmail(TestUsersProvider.SignUpModelWithCorrectFields().getEmail());
        if(user.isEmpty()){
            var signupModel = modelMapper.map(TestUsersProvider.SignUpModelWithCorrectFields(), User.class);
            authenticationService.signup(signupModel);
            var userDao = userRepository.findByEmail(signupModel.getEmail());
            EXISTING_USER_ID=userDao.get().getId();
        }
        else EXISTING_USER_ID=user.get().getId();
    }

    @Test
    @Order(1)
    public void find_all_test(){
        var users = userService.findAll();

        int counter=0;
        for (var u: users) {
            ++counter;
        }
        var hasMoreThan0 = counter>0;

        assertTrue(hasMoreThan0);
    }

    @Test
    @Order(2)
    public void successful_find_by_id_test(){
        var userProvidedByService = userService.findById(EXISTING_USER_ID);
        var userProvidedByRepo = userRepository.findById(EXISTING_USER_ID).get();

        assertEquals(userProvidedByService.getId(), userProvidedByRepo.getId());
    }

    @Test
    @Order(3)
    public void successful_update_test(){
        var model = TestUsersProvider.UserPatchModelWithCorrectFields();

        var updatedUser = userService.update(EXISTING_USER_ID, model);
        var dao = userRepository.findById(updatedUser.getId());

        var userGotUpdated = model.getFirstname().equals(dao.get().getFirstname()) &&
                                model.getLastname().equals(dao.get().getLastname());

        assertTrue(userGotUpdated);
        userService.update(EXISTING_USER_ID,TestUsersProvider.getDefaultTestUser());
    }

    @Test
    @Order(4)
    public void successful_add_balance_test(){
        var currentUser = userService.findById(EXISTING_USER_ID);
        userService.addBalance(EXISTING_USER_ID);
        var updatedUser = userService.findById(EXISTING_USER_ID);

        assertThat(updatedUser.getBalance()).isGreaterThan(currentUser.getBalance());
    }

    @Test
    @Order(5)
    public void successful_delete_test(){
        User user=null;
        try {
            userService.delete(EXISTING_USER_ID);
            user = userService.findById(EXISTING_USER_ID);
        }
        catch (RuntimeException e) {
            assertThat(user).isNull();
        }
    }

    @Test
    @Order(6)
    public void not_successful_find_by_id_test(){
        var userProvidedByService = userService.findById(NOT_EXISTING_USER_ID);
        var userProvidedByRepo = userRepository.findById(NOT_EXISTING_USER_ID).get();

        assertEquals(userProvidedByService.getId(), userProvidedByRepo.getId());
    }

    @Test
    @Order(7)
    public void not_successful_update_test(){
        var model =TestUsersProvider.UserPatchModelWithIncorrectFields();

        var updatedUser = userService.update(EXISTING_USER_ID, model);
        var dao = userRepository.findById(updatedUser.getId());

        var userGotUpdated = model.getFirstname().equals(dao.get().getFirstname()) &&
                model.getLastname().equals(dao.get().getLastname());

        assertTrue(userGotUpdated);
    }

    @Test
    @Order(8)
    public void not_successful_delete_test() {
        userService.delete(NOT_EXISTING_USER_ID);
        var user = userService.findById(NOT_EXISTING_USER_ID);
        assertThat(user).isNotNull();
    }
}
