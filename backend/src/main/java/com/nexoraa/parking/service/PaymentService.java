package com.nexoraa.parking.service;


import com.nexoraa.parking.dto.PaymentRequest;
import com.nexoraa.parking.dto.PaymentResponse;
import com.nexoraa.parking.entity.ParkingSession;
import com.nexoraa.parking.entity.ParkingSessionStatus;
import com.nexoraa.parking.entity.Payment;
import com.nexoraa.parking.entity.PaymentStatus;
import com.nexoraa.parking.exception.BadRequestException;
import com.nexoraa.parking.exception.ResourceNotFoundException;
import com.nexoraa.parking.repository.ParkingSessionRepository;
import com.nexoraa.parking.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ParkingSessionRepository parkingSessionRepository;

    // CREATE PAYMENT
    @Transactional
    public PaymentResponse makePayment(PaymentRequest request) {

        // 1. Find parking session
        ParkingSession session =
                parkingSessionRepository.findById(
                        request.getParkingSessionId()
                ).orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking session not found with id: "
                                        + request.getParkingSessionId()
                        )
                );

        // 2. Session must be completed
        if (session.getStatus()
                != ParkingSessionStatus.COMPLETED) {

            throw new BadRequestException(
                    "Payment can only be made after vehicle exit"
            );
        }

        // 3. Fee must exist
        if (session.getParkingFee() == null) {

            throw new BadRequestException(
                    "Parking fee has not been calculated"
            );
        }

        // 4. Check whether payment already exists
        if (paymentRepository
                .findByParkingSessionId(session.getId())
                .isPresent()) {

            throw new BadRequestException(
                    "Payment already exists for parking session: "
                            + session.getId()
            );
        }

        // 5. Generate transaction reference
        String transactionReference =
                "TXN-" + UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();

        // 6. Create payment
        Payment payment = Payment.builder()
                .parkingSession(session)
                .amount(session.getParkingFee())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(PaymentStatus.PAID)
                .transactionReference(transactionReference)
                .paymentTime(LocalDateTime.now())
                .build();

        // 7. Save payment
        Payment savedPayment =
                paymentRepository.save(payment);

        return mapToResponse(savedPayment);
    }

    // GET ALL PAYMENTS
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET PAYMENT BY ID
    public PaymentResponse getPaymentById(Long id) {

        Payment payment =
                paymentRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found with id: "
                                                + id
                                )
                        );

        return mapToResponse(payment);
    }

    // GET PAYMENT BY SESSION
    public PaymentResponse getPaymentBySessionId(
            Long sessionId) {

        Payment payment =
                paymentRepository
                        .findByParkingSessionId(sessionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Payment not found for session: "
                                                + sessionId
                                )
                        );

        return mapToResponse(payment);
    }

    // ENTITY → RESPONSE
    private PaymentResponse mapToResponse(
            Payment payment) {

        return PaymentResponse.builder()
                .id(payment.getId())
                .parkingSessionId(
                        payment.getParkingSession().getId()
                )
                .vehicleNumber(
                        payment.getParkingSession()
                                .getVehicle()
                                .getVehicleNumber()
                )
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .paymentStatus(payment.getPaymentStatus())
                .transactionReference(
                        payment.getTransactionReference()
                )
                .paymentTime(payment.getPaymentTime())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}