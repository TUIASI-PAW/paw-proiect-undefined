package com.proiect.exceptions;

public class UserOperationNotAllowedException extends RuntimeException {
    public UserOperationNotAllowedException(String msg) {
        super(msg);
    }
}
