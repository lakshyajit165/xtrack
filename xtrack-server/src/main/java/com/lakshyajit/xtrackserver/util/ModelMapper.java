package com.lakshyajit.xtrackserver.util;

import com.lakshyajit.xtrackserver.model.Category;
import com.lakshyajit.xtrackserver.model.Payment;
import com.lakshyajit.xtrackserver.payload.PaymentResponse;

import java.math.BigDecimal;
import java.time.Instant;

public class ModelMapper {

    public static PaymentResponse mapPaymentToPaymentResponse(Payment payment){

        PaymentResponse paymentResponse = new PaymentResponse(
                payment.getId(),
                payment.getAmount(),
                payment.getPayee(),
                payment.getPayer(),
                payment.getDescription(),
                payment.getCategory(),
                payment.getCreatedAt(),
                payment.getUpdatedAt()



        );

        return paymentResponse;
    }
}
