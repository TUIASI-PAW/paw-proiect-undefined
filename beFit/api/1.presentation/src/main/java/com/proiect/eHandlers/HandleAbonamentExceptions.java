package com.proiect.eHandlers;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

//
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HandleAbonamentExceptions {
    @ExceptionHandler(MissingServletRequestPartException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponseMessage> handleMissingServletRequestPartException(MissingServletRequestPartException ex) {
        if (ex.getMessage().equals("Required request part 'image' is not present"))
            return new ResponseEntity<>(new ErrorResponseMessage("Imaginea este obligatorie."), HttpStatus.BAD_REQUEST);
        else return new ResponseEntity<>(new ErrorResponseMessage(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }
}
