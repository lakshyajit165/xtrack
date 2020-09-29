package com.lakshyajit.xtrackserver.payload;

import com.lakshyajit.xtrackserver.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
public class PaymentResponse {

    private Long id;
    private BigDecimal amount;
    private String payee, payer, description;
    private Category category;
    private Instant createdAt;
    private Instant updatedAt;

    public PaymentResponse(
            Long id,
            BigDecimal amount,
            String payee,
            String payer,
            String description,
            Category category,
            Instant createdAt,
            Instant updatedAt
    ) {
        this.id = id;
        this.amount = amount;
        this.payee = payee;
        this.payer = payer;
        this.description = description;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
