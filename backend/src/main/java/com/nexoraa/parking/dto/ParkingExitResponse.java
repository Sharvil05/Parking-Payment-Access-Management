package com.nexoraa.parking.dto;


import com.nexoraa.parking.entity.ParkingSessionStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingExitResponse {

    private Long sessionId;

    private String vehicleNumber;

    private String vehicleType;

    private String slotNumber;

    private LocalDateTime entryTime;

    private LocalDateTime exitTime;

    private Long durationMinutes;

    private BigDecimal parkingFee;

    private ParkingSessionStatus status;
}