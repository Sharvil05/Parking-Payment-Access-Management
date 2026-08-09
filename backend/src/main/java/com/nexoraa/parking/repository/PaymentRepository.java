package com.nexoraa.parking.repository;

import com.nexoraa.parking.entity.Payment;
import com.nexoraa.parking.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment, Long> {

    Optional<Payment> findByParkingSessionId(
            Long parkingSessionId
    );

    Optional<Payment> findByTransactionReference(
            String transactionReference
    );

    List<Payment> findByPaymentStatus(
            PaymentStatus paymentStatus
    );

    @Query("""
            SELECT COALESCE(SUM(p.amount), 0)
            FROM Payment p
            WHERE p.paymentStatus = :status
            """)
    BigDecimal calculateTotalRevenue(
            @Param("status") PaymentStatus status
    );
}