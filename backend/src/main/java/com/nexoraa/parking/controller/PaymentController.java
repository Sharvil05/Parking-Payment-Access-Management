package com.nexoraa.parking.controller;


import com.nexoraa.parking.dto.PaymentRequest;
import com.nexoraa.parking.dto.PaymentResponse;
import com.nexoraa.parking.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // MAKE PAYMENT
    @PostMapping
    public ResponseEntity<PaymentResponse> makePayment(
            @Valid @RequestBody PaymentRequest request) {

        PaymentResponse response =
                paymentService.makePayment(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // GET ALL PAYMENTS
    @GetMapping
    public ResponseEntity<List<PaymentResponse>> getAllPayments() {

        return ResponseEntity.ok(
                paymentService.getAllPayments()
        );
    }

    // GET PAYMENT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponse> getPaymentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                paymentService.getPaymentById(id)
        );
    }

    // GET PAYMENT BY SESSION
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<PaymentResponse>
    getPaymentBySessionId(
            @PathVariable Long sessionId) {

        return ResponseEntity.ok(
                paymentService.getPaymentBySessionId(sessionId)
        );
    }
}