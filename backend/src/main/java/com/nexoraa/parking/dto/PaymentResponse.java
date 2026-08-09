package com.nexoraa.parking.dto;

import com.nexoraa.parking.entity.PaymentMethod;
import com.nexoraa.parking.entity.PaymentStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {

    private Long id;

    private Long parkingSessionId;

    private String vehicleNumber;

    private BigDecimal amount;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private String transactionReference;

    private LocalDateTime paymentTime;

    private LocalDateTime createdAt;
}