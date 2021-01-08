package com.proiect.controllers.user;

import com.proiect.entities.Role;
import com.proiect.exceptions.UserOperationNotAllowedException;
import com.proiect.security.JwtTokenProvider;
import com.proiect.services.models.user.UserDetailsModel;
import com.proiect.services.models.user.UserPatchModel;
import com.proiect.services.user.IUserService;
import org.modelmapper.ModelMapper;
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
    @Autowired
    private final ModelMapper modelMapper;

    public UserController(IUserService userService, JwtTokenProvider jwtTokenProvider, ModelMapper modelMapper) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDetailsModel> getUser(@PathVariable int id, @RequestHeader(value = "Authorization") String Authorization) {

        var role = jwtTokenProvider.getRole(Authorization.substring(7)).get(0);

        //Admin access
        if (role.get("authority").equals(Role.ROLE_ADMIN.getAuthority())) {
            var user = userService.findById(id);
            return new ResponseEntity<>(modelMapper.map(user, UserDetailsModel.class), HttpStatus.OK);
        }

        //Client access
        else {
            var userId = jwtTokenProvider.getId(Authorization.substring(7));
            if (id != userId) throw new UserOperationNotAllowedException("Nu poţi face asta.");

            var user = userService.findById(id);
            return new ResponseEntity<>(modelMapper.map(user, UserDetailsModel.class), HttpStatus.OK);
        }
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<UserDetailsModel> update(@PathVariable int id,
                                                   @Validated @RequestBody UserPatchModel userPatchModel,
                                                   @RequestHeader(value = "Authorization") String Authorization) {

        var userId = jwtTokenProvider.getId(Authorization.substring(7));
        if (id != userId) throw new UserOperationNotAllowedException("Nu poţi face asta.");

        var user = this.userService.update(id, userPatchModel);
        return new ResponseEntity<>(modelMapper.map(user, UserDetailsModel.class), HttpStatus.ACCEPTED);
    }

    @PatchMapping("/{id}/balance")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity addBalance(@PathVariable int id,
                                     @RequestHeader(value = "Authorization") String Authorization) {

        var userId = jwtTokenProvider.getId(Authorization.substring(7));
        if (id != userId) throw new UserOperationNotAllowedException("Nu poţi face asta.");
        userService.addBalance(id);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable int id) {
        userService.delete(id);
    }
}
