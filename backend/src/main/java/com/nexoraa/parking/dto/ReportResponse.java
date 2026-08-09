package com.nexoraa.parking.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportResponse {

    private long totalUsers;

    private long totalVehicles;

    private long totalParkingSlots;

    private long availableSlots;

    private long occupiedSlots;

    private long activeSessions;

    private long completedSessions;

    private long totalPayments;

    private BigDecimal totalRevenue;
}