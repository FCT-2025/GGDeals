package com.ggdeal.dto.api;

import lombok.Data;

import java.util.List;

@Data
public class PurchaseResponseDTO {
    private boolean success;
    private String message;
    private List<ActivationKeyDTO> activationKeys;

    public PurchaseResponseDTO() {}

    public PurchaseResponseDTO(boolean success, String message, List<ActivationKeyDTO> activationKeys) {
        this.success = success;
        this.message = message;
        this.activationKeys = activationKeys;
    }

    // Getters y setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<ActivationKeyDTO> getActivationKeys() {
        return activationKeys;
    }

    public void setActivationKeys(List<ActivationKeyDTO> activationKeys) {
        this.activationKeys = activationKeys;
    }
}
