package com.ggdeal.dto.admin;

import lombok.Getter;

@Getter
public class DistributionPlataformDTO {
    private String platformName;
    private Long platformDistribution;


    public DistributionPlataformDTO(String platformName, Long platformDistribution) {
        this.platformName = platformName;
        this.platformDistribution = platformDistribution;
    }
}
