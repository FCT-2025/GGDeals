package com.ggdeal.model;

import jakarta.persistence.*;

import lombok.*;


@Entity
@Data
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PlatformModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "platform_type_id", nullable = false)
    private PlatformType platformType;

}
