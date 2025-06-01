package com.ggdeal.dto.admin;

import lombok.Getter;

@Getter
public class SalesPerMonthDTO {
    private Integer month;
    private Long total;

    public SalesPerMonthDTO(Integer month, Long total) {
        this.month = month;
        this.total = total;
    }
}
