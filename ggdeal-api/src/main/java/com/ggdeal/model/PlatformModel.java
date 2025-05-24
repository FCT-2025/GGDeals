package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PlatformModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "platform_type_id", nullable = false)
    private PlatformType platformType;
}