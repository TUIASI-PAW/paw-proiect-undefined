package com.proiect.controllers;

import com.proiect.entities.Role;
import com.proiect.entities.User;
import com.proiect.exceptions.UserOperationNotAllowedException;
import com.proiect.security.JwtTokenProvider;
import com.proiect.services.authentication.IAuthenticationService;
import com.proiect.services.models.user.UserPatchModel;
import com.proiect.services.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private final IUserService userService;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(IUserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<User> getUser(@PathVariable int id, @RequestHeader(value = "Authorization") String Authorization) {

        var role = jwtTokenProvider.getRole(Authorization.substring(7)).get(0);

        //Admin access
        if (role.get("authority").equals(Role.ROLE_ADMIN.getAuthority())) {
            var user = userService.findById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }

        //Client access
        else
        {
            var userId = jwtTokenProvider.getId(Authorization.substring(7));
            if(id!=userId) throw new UserOperationNotAllowedException("You can't do that.");

            var user = userService.findById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<User> update(@PathVariable int id,
                                      @Validated @RequestBody UserPatchModel userPatchModel,
                                      @RequestHeader(value = "Authorization") String Authorization){

        var userId = jwtTokenProvider.getId(Authorization.substring(7));
        if(id!=userId) throw new UserOperationNotAllowedException("You can't do that.");

        var user = this.userService.update(id, userPatchModel);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }
}
