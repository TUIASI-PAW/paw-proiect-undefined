package com.proiect.testing;

import com.proiect.entities.Role;
import com.proiect.services.models.user.UserPatchModel;
import com.proiect.services.models.user.UserSignupModel;

import java.util.Arrays;

public class TestUsersProvider {
    public static UserPatchModel getDefaultTestUser() {
        var user = new UserPatchModel();
        user.setPhone("1231231231");
        user.setPassword("user_test");
        user.setNewPassword("user_test");
        user.setLastname("user");
        user.setFirstname("test");
        user.setEmail("user_test@test.com");

        return user;
    }

    public static UserSignupModel SignUpModelWithCorrectFields() {
        var user = new UserSignupModel();
        user.setPhone("1000000000");
        user.setPassword("user_test");
        user.setLastname("Test");
        user.setFirstname("Test");
        user.setEmail("user_test@test.org");

        user.setRoles(Arrays.asList(Role.ROLE_CLIENT));

        return user;
    }

    public static UserSignupModel SignUpModelWithIncorrectFields() {
        var user = new UserSignupModel();
        user.setPhone("1");
        user.setPassword("user_test");
        user.setLastname("Bad");
        user.setFirstname("User");
        user.setEmail("bad_user@test.org");
        user.setRoles(Arrays.asList(Role.ROLE_CLIENT));

        return user;
    }

    public static UserPatchModel UserPatchModelWithCorrectFields() {
        var user = new UserPatchModel();
        user.setPhone("9999999999");
        user.setPassword("user_test");
        user.setNewPassword("user_test");
        user.setLastname("Updated");
        user.setFirstname("User");

        return user;
    }

    public static UserPatchModel UserPatchModelWithIncorrectFields() {
        var user = new UserPatchModel();
        user.setPhone("1");
        user.setPassword("user_test");
        user.setNewPassword("user_test");
        user.setLastname("Bad");
        user.setFirstname("Update");
        user.setEmail("bad_update@test.org");

        return user;
    }
}
