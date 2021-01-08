package com.proiect.eHandlers;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
public class HandleGlobalExceptions {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponseMessage> handleException(Exception ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponseMessage> handleRuntimeException(RuntimeException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
