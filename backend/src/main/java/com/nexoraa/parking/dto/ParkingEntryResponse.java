package com.nexoraa.parking.dto;


import com.nexoraa.parking.entity.ParkingSessionStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingEntryResponse {

    private Long sessionId;

    private String vehicleNumber;

    private String vehicleType;

    private String slotNumber;

    private Integer floor;

    private LocalDateTime entryTime;

    private ParkingSessionStatus status;
}