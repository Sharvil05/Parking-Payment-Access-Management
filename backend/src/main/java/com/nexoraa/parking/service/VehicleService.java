package com.nexoraa.parking.service;


import com.nexoraa.parking.dto.VehicleRequest;
import com.nexoraa.parking.dto.VehicleResponse;
import com.nexoraa.parking.entity.User;
import com.nexoraa.parking.entity.Vehicle;
import com.nexoraa.parking.exception.BadRequestException;
import com.nexoraa.parking.exception.ResourceNotFoundException;
import com.nexoraa.parking.repository.UserRepository;
import com.nexoraa.parking.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    // CREATE VEHICLE
    public VehicleResponse createVehicle(VehicleRequest request) {

        // Check duplicate vehicle number
        if (vehicleRepository.existsByVehicleNumber(
                request.getVehicleNumber())) {

            throw new BadRequestException(
                    "Vehicle already exists with number: "
                            + request.getVehicleNumber()
            );
        }

        // Find owner
        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner not found with id: "
                                        + request.getOwnerId()
                        )
                );

        // Create vehicle
        Vehicle vehicle = Vehicle.builder()
                .vehicleNumber(request.getVehicleNumber().toUpperCase())
                .vehicleType(request.getVehicleType())
                .owner(owner)
                .build();

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(savedVehicle);
    }

    // GET ALL VEHICLES
    public List<VehicleResponse> getAllVehicles() {

        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET VEHICLE BY ID
    public VehicleResponse getVehicleById(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        )
                );

        return mapToResponse(vehicle);
    }

    // GET VEHICLES BY OWNER
    public List<VehicleResponse> getVehiclesByOwner(Long ownerId) {

        User owner = userRepository.findById(ownerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner not found with id: " + ownerId
                        )
                );

        return vehicleRepository.findByOwner(owner)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // UPDATE VEHICLE
    public VehicleResponse updateVehicle(
            Long id,
            VehicleRequest request) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        )
                );

        // Check whether the new vehicle number belongs to another vehicle
        if (!vehicle.getVehicleNumber()
                .equalsIgnoreCase(request.getVehicleNumber())
                && vehicleRepository.existsByVehicleNumber(
                request.getVehicleNumber())) {

            throw new BadRequestException(
                    "Another vehicle already exists with number: "
                            + request.getVehicleNumber()
            );
        }

        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Owner not found with id: "
                                        + request.getOwnerId()
                        )
                );

        vehicle.setVehicleNumber(
                request.getVehicleNumber().toUpperCase()
        );

        vehicle.setVehicleType(request.getVehicleType());

        vehicle.setOwner(owner);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return mapToResponse(updatedVehicle);
    }

    // DELETE VEHICLE
    public void deleteVehicle(Long id) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with id: " + id
                        )
                );

        vehicleRepository.delete(vehicle);
    }

    // ENTITY → RESPONSE DTO
    private VehicleResponse mapToResponse(Vehicle vehicle) {

        return VehicleResponse.builder()
                .id(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .vehicleType(vehicle.getVehicleType())
                .ownerId(vehicle.getOwner().getId())
                .ownerName(vehicle.getOwner().getName())
                .createdAt(vehicle.getCreatedAt())
                .build();
    }
}
