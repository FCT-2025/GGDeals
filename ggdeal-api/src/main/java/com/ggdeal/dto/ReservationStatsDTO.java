package com.ggdeal.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ReservationStatsDTO {
    private Long total;
    private Long active;
}
