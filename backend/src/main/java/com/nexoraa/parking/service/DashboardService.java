package com.nexoraa.parking.service;


import com.nexoraa.parking.dto.DashboardResponse;
import com.nexoraa.parking.entity.ParkingSessionStatus;
import com.nexoraa.parking.entity.ParkingSlotStatus;
import com.nexoraa.parking.entity.PaymentStatus;
import com.nexoraa.parking.repository.ParkingSessionRepository;
import com.nexoraa.parking.repository.ParkingSlotRepository;
import com.nexoraa.parking.repository.PaymentRepository;
import com.nexoraa.parking.repository.UserRepository;
import com.nexoraa.parking.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final ParkingSlotRepository parkingSlotRepository;
    private final ParkingSessionRepository parkingSessionRepository;
    private final PaymentRepository paymentRepository;

    public DashboardResponse getDashboardSummary() {

        long totalUsers =
                userRepository.count();

        long totalVehicles =
                vehicleRepository.count();

        long totalParkingSlots =
                parkingSlotRepository.count();

        long availableSlots =
                parkingSlotRepository.countByStatus(
                        ParkingSlotStatus.AVAILABLE
                );

        long occupiedSlots =
                parkingSlotRepository.countByStatus(
                        ParkingSlotStatus.OCCUPIED
                );

        long activeSessions =
                parkingSessionRepository.countByStatus(
                        ParkingSessionStatus.ACTIVE
                );

        long completedSessions =
                parkingSessionRepository.countByStatus(
                        ParkingSessionStatus.COMPLETED
                );

            long totalPayments =
                    paymentRepository
                            .findByPaymentStatus(PaymentStatus.PAID)
                            .size();

            BigDecimal totalRevenue =
                    paymentRepository.calculateTotalRevenue(
                            PaymentStatus.PAID
                    );

        return DashboardResponse.builder()
                .totalUsers(totalUsers)
                .totalVehicles(totalVehicles)
                .totalParkingSlots(totalParkingSlots)
                .availableSlots(availableSlots)
                .occupiedSlots(occupiedSlots)
                .activeSessions(activeSessions)
                .completedSessions(completedSessions)
                .totalPayments(totalPayments)
                .totalRevenue(totalRevenue)
                .build();
    }
}