package com.ggdeal.dto.api;

import lombok.Data;

@Data
public class ActivationKeyDTO {
    private String gameName;
    private String activationKey;
    private int quantity;

    public ActivationKeyDTO() {}

    public ActivationKeyDTO(String gameName, String activationKey, int quantity) {
        this.gameName = gameName;
        this.activationKey = activationKey;
        this.quantity = quantity;
    }

    // Getters y setters
    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
