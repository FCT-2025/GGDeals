package com.ggdeal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @NotNull(message = "La fecha de compra es obligatoria.")
    @Column(name = "purcharse_date")
    private LocalDateTime purchaseDate;

    @NotNull(message = "El importe es obligatorio.")
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "replica_id")
    private Replica replica;

    private String status;

    private String paymentMethod;

    @Column(name = "purcharse_amount")
    private Double purchaseAmount;

    public Double getPurchaseAmount() {
        return purchaseAmount;
    }

    public void setPurchaseAmount(Double purchaseAmount) {
        this.purchaseAmount = purchaseAmount;
    }

    @OneToMany(mappedBy = "sale", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<SaleEvent> events;

    @PrePersist
    public void prePersist() {
        // Establecer valores por defecto al crear una nueva venta
        if (purchaseDate == null) {
            purchaseDate = LocalDateTime.now();
        }
        if (purchaseAmount == null) {
            purchaseAmount = amount;
        }
        if (status == null) {
            status = "completed";
        }
    }
}