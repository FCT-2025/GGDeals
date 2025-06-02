package com.ggdeal.dto.api;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private Long replicaId;
    private Integer quantity;
    private String gameName;
    private Float price;
}