package com.ggdeal.exception;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ErrorResponseDTO {
    private int status;
    private String message;
}
