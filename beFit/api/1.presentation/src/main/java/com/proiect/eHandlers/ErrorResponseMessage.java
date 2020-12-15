package com.proiect.eHandlers;

public class ErrorResponseMessage {
    private String message;

    public ErrorResponseMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
