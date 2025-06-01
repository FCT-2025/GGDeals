package com.ggdeal.dto.admin;

import java.time.LocalDateTime;

public class SaleDTO {

    private Long id;
    private Long userId;
    private Long replicaId;
    private Double amount;  // Cambiado de BigDecimal a Double
    private String status;
    private String paymentMethod;
    private LocalDateTime purchaseDate;

    // Constructores
    public SaleDTO() {
    }

    public SaleDTO(Long id, Long userId, Long replicaId, Double amount,
                   String status, String paymentMethod, LocalDateTime purchaseDate) {
        this.id = id;
        this.userId = userId;
        this.replicaId = replicaId;
        this.amount = amount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.purchaseDate = purchaseDate;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getReplicaId() {
        return replicaId;
    }

    public void setReplicaId(Long replicaId) {
        this.replicaId = replicaId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    @Override
    public String toString() {
        return "SaleDTO{" +
                "id=" + id +
                ", userId=" + userId +
                ", replicaId=" + replicaId +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", purchaseDate=" + purchaseDate +
                '}';
    }
}