package com.ggdeal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlatformModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tiene que tener un nombre")
    private String name;

    private String pathLogo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "platform_type_id", nullable = false)
    @JsonIgnore
    private PlatformType platformType;

    @OneToMany(mappedBy = "platformModel")
    @JsonIgnore
    private List<Replica> replicas;

}