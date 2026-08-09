package com.nexoraa.parking.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParkingEntryRequest {

    @NotBlank(message = "Vehicle number is required")
    private String vehicleNumber;
}