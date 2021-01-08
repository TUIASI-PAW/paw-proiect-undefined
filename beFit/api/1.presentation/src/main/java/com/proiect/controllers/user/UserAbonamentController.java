package com.proiect.controllers.user;

import com.proiect.exceptions.UserOperationNotAllowedException;
import com.proiect.security.JwtTokenProvider;
import com.proiect.services.user.IUserAbonamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserAbonamentController {
    @Autowired
    private final IUserAbonamentService userAbonamentService;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    public UserAbonamentController(IUserAbonamentService userAbonamentService, JwtTokenProvider jwtTokenProvider) {
        this.userAbonamentService = userAbonamentService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/{userId}/abonament/{abId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity addAbonament(@PathVariable int userId, @PathVariable int abId,
                                       @RequestHeader(value = "Authorization") String Authorization) {
        var tokenUserId = jwtTokenProvider.getId(Authorization.substring(7));
        if (userId != tokenUserId) throw new UserOperationNotAllowedException("Nu poţi face asta.");
        userAbonamentService.add(userId, abId);
        return new ResponseEntity(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{userId}/abonament/{abId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity removeAbonament(@PathVariable int userId, @PathVariable int abId,
                                          @RequestHeader(value = "Authorization") String Authorization) {
        var tokenUserId = jwtTokenProvider.getId(Authorization.substring(7));
        if (userId != tokenUserId) throw new UserOperationNotAllowedException("Nu poţi face asta.");
        userAbonamentService.remove(userId, abId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
