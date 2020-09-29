package com.lakshyajit.xtrackserver.payload;

import com.lakshyajit.xtrackserver.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class PaymentRequest {


    private String amount; // amount comes in as a string, convert it to BD in service

    private String payee;

    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;
}
