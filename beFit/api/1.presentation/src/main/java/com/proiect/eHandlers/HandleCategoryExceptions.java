package com.proiect.eHandlers;

import com.proiect.exceptions.CategoryExceptions.CategoryAlreadyExistsException;
import com.proiect.exceptions.CategoryExceptions.CategoryNotExistsException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HandleCategoryExceptions {
    @ExceptionHandler(CategoryAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ErrorResponseMessage> handleCategoryAlreadyExistsException(CategoryAlreadyExistsException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.CONFLICT);
    }

    @ExceptionHandler(CategoryNotExistsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponseMessage> handleCategoryNotExistsException(CategoryNotExistsException ex) {
        return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }
}
