package com.proiect.eHandlers;

import com.proiect.exceptions.UserExceptions.UserAlreadyOwnProductException;
import com.proiect.exceptions.UserExceptions.UserEmailAlreadyExistsException;
import com.proiect.exceptions.UserExceptions.UserInsufficientFoundsException;
import com.proiect.exceptions.UserExceptions.UserNotFoundException;
import com.proiect.exceptions.UserOperationNotAllowedException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HandleUserExceptions {
    @ExceptionHandler(UserEmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponseMessage> handleUserEmailAlreadyExistsException(UserEmailAlreadyExistsException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.CONFLICT);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseMessage> handleBadCredentialsException(BadCredentialsException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponseMessage> handleUserNotFoundException(UserNotFoundException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserOperationNotAllowedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ErrorResponseMessage> handleUserOperationNotAllowedException(UserOperationNotAllowedException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UserInsufficientFoundsException.class)
    @ResponseStatus(HttpStatus.PAYMENT_REQUIRED)
    public ResponseEntity<ErrorResponseMessage> handleUserInsufficientFoundsException(UserInsufficientFoundsException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.PAYMENT_REQUIRED);
    }

    @ExceptionHandler(UserAlreadyOwnProductException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponseMessage> handleUserAlreadyOwnProductException(UserAlreadyOwnProductException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.CONFLICT);
    }
}
