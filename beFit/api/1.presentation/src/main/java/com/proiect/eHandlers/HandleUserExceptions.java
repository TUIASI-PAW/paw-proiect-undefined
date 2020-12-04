package com.proiect.eHandlers;

import com.proiect.exceptions.UserExceptions.UserEmailAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HandleUserExceptions {
    @ExceptionHandler(UserEmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ResponseEntity<ErrorResponseMessage> handleAuthorNotFound(RuntimeException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
