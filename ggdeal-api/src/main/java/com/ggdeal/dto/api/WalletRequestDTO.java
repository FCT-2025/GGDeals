package com.ggdeal.dto.api;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class WalletRequestDTO {
    @NotNull
    @DecimalMin(value = "0.01", message = "La cantidad debe ser mayor que cero")
    private Float amount;
}
