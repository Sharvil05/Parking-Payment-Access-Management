package com.nexoraa.parking.dto;


import com.nexoraa.parking.entity.ParkingSlotType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkingSlotRequest {

    @NotBlank(message = "Slot number is required")
    private String slotNumber;

    @NotNull(message = "Slot type is required")
    private ParkingSlotType slotType;

    @NotNull(message = "Floor is required")
    @Min(value = 1, message = "Floor must be at least 1")
    private Integer floor;

    private String description;
}