package com.nexoraa.parking.dto;


import com.nexoraa.parking.entity.ParkingSlotStatus;
import com.nexoraa.parking.entity.ParkingSlotType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSlotResponse {

    private Long id;

    private String slotNumber;

    private ParkingSlotType slotType;

    private ParkingSlotStatus status;

    private Integer floor;

    private String description;
}