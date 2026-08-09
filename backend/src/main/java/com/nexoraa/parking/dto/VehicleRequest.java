package com.nexoraa.parking.dto;


import com.nexoraa.parking.entity.VehicleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VehicleRequest {

    @NotBlank(message = "Vehicle number is required")
    @Size(max = 20, message = "Vehicle number must not exceed 20 characters")
    private String vehicleNumber;

    @NotNull(message = "Vehicle type is required")
    private VehicleType vehicleType;

    @NotNull(message = "Owner ID is required")
    private Long ownerId;
}
