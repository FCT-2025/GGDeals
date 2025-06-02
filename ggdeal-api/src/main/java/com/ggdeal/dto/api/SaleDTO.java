package com.ggdeal.dto.api;


import com.ggdeal.model.Sale;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SaleDTO {
    private Long id;
    private LocalDateTime purchaseDate;
    private Double amount;
    private String status;
    private String paymentMethod;
    private Double purchaseAmount;

    private GameDTO game;
    private EditionDTO edition;

    public SaleDTO(Sale sale) {
        this.id = sale.getId();
        this.purchaseDate = sale.getPurchaseDate();
        this.amount = sale.getAmount();
        this.status = sale.getStatus();
        this.paymentMethod = sale.getPaymentMethod();
        this.purchaseAmount = sale.getPurchaseAmount();

        if(sale.getReplica() != null && sale.getReplica().getEdition() != null) {
            this.edition = new EditionDTO(sale.getReplica().getEdition());
        }

        if (sale.getReplica() != null && sale.getReplica().getGame() != null) {
            this.game = new GameDTO(sale.getReplica().getGame());
        }
    }
}
