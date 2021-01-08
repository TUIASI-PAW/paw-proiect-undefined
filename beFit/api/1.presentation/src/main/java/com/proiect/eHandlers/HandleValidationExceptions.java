package com.proiect.eHandlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HandleValidationExceptions {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<List<String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) throws JsonProcessingException {
        var errors = new ArrayList<String>();

        for (var fe : ex.getBindingResult().getFieldErrors())
            errors.add(fe.getField() + ": " + fe.getDefaultMessage());

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
