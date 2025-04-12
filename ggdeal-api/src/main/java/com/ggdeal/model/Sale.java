package com.ggdeal.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@ToString
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate purcharse_date;
    private Integer purcharse_amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @OneToOne
    @JoinColumn(name = "replica_id")
    private Replica replica;
}
