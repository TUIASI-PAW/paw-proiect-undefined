package com.proiect.exceptions.CategoryExceptions;


public class CategoryNotExistsException extends RuntimeException {
    public CategoryNotExistsException(String message) {
        super(message);
    }
}
