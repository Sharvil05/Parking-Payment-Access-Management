package com.nexoraa.parking.controller;


import com.nexoraa.parking.dto.VehicleRequest;
import com.nexoraa.parking.dto.VehicleResponse;
import com.nexoraa.parking.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    // CREATE VEHICLE
    @PostMapping
    public ResponseEntity<VehicleResponse> createVehicle(
            @Valid @RequestBody VehicleRequest request) {

        VehicleResponse response =
                vehicleService.createVehicle(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // GET ALL VEHICLES
    @GetMapping
    public ResponseEntity<List<VehicleResponse>> getAllVehicles() {

        return ResponseEntity.ok(
                vehicleService.getAllVehicles()
        );
    }

    // GET VEHICLE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponse> getVehicleById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                vehicleService.getVehicleById(id)
        );
    }

    // GET VEHICLES BY OWNER
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<VehicleResponse>> getVehiclesByOwner(
            @PathVariable Long ownerId) {

        return ResponseEntity.ok(
                vehicleService.getVehiclesByOwner(ownerId)
        );
    }

    // UPDATE VEHICLE
    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponse> updateVehicle(
            @PathVariable Long id,
            @Valid @RequestBody VehicleRequest request) {

        return ResponseEntity.ok(
                vehicleService.updateVehicle(id, request)
        );
    }

    // DELETE VEHICLE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(
            @PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return ResponseEntity.noContent().build();
    }
}