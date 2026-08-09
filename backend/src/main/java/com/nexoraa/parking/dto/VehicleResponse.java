package com.nexoraa.parking.dto;

import com.nexoraa.parking.entity.VehicleType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponse {

    private Long id;

    private String vehicleNumber;

    private VehicleType vehicleType;

    private Long ownerId;

    private String ownerName;

    private LocalDateTime createdAt;
}
