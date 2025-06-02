package com.ggdeal.exception;

public class DuplicateGameNameException extends RuntimeException {
    public DuplicateGameNameException(String message) {
        super(message);
    }
}