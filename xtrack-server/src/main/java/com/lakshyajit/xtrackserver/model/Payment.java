package com.lakshyajit.xtrackserver.model;

import com.lakshyajit.xtrackserver.model.DateAudit.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Entity
@Table(name = "payments")
@Getter
@Setter
public class Payment extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal amount;

    @NotBlank
    private String payee;

    @NotBlank
    private String payer;

    @NotBlank
    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;

}
