package com.proiect.exceptions.UserExceptions;

public class UserAlreadyOwnProductException extends RuntimeException {
    public UserAlreadyOwnProductException(String msg) {
        super(msg);
    }

}
