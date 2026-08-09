package com.nexoraa.parking.dto;


import com.nexoraa.parking.entity.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {

    @NotNull(message = "Parking session ID is required")
    private Long parkingSessionId;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;
}