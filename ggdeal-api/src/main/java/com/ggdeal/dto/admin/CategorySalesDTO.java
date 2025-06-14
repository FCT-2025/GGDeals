package com.ggdeal.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategorySalesDTO {
    private String name;
    private long sales;
    private double revenue;
}