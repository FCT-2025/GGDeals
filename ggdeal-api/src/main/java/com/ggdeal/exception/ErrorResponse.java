package com.ggdeal.exception;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
public class ErrorResponse {
    private int status;
    private String message;
}
