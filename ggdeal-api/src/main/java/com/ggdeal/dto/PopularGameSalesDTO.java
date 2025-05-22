package com.ggdeal.dto;

import lombok.Getter;

@Getter
public class PopularGameSalesDTO {
    private String title;
    private Long totalSales;

    public PopularGameSalesDTO(String title, Long totalSales) {
        this.title = title;
        this.totalSales = totalSales;
    }
}
