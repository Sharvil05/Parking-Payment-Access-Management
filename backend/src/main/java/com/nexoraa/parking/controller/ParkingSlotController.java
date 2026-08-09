package com.nexoraa.parking.controller;


import com.nexoraa.parking.dto.ParkingSlotRequest;
import com.nexoraa.parking.dto.ParkingSlotResponse;
import com.nexoraa.parking.entity.ParkingSlotStatus;
import com.nexoraa.parking.entity.ParkingSlotType;
import com.nexoraa.parking.service.ParkingSlotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-slots")
@RequiredArgsConstructor
public class ParkingSlotController {

    private final ParkingSlotService parkingSlotService;

    // CREATE SLOT
    @PostMapping
    public ResponseEntity<ParkingSlotResponse> createSlot(
            @Valid @RequestBody ParkingSlotRequest request) {

        ParkingSlotResponse response =
                parkingSlotService.createSlot(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // GET ALL SLOTS
    @GetMapping
    public ResponseEntity<List<ParkingSlotResponse>> getAllSlots() {

        return ResponseEntity.ok(
                parkingSlotService.getAllSlots()
        );
    }

    // GET SLOT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ParkingSlotResponse> getSlotById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                parkingSlotService.getSlotById(id)
        );
    }

    // GET AVAILABLE SLOTS
    @GetMapping("/available")
    public ResponseEntity<List<ParkingSlotResponse>>
    getAvailableSlots() {

        return ResponseEntity.ok(
                parkingSlotService.getAvailableSlots()
        );
    }

    // GET AVAILABLE SLOTS BY TYPE
    @GetMapping("/available/type/{slotType}")
    public ResponseEntity<List<ParkingSlotResponse>>
    getAvailableSlotsByType(
            @PathVariable ParkingSlotType slotType) {

        return ResponseEntity.ok(
                parkingSlotService
                        .getAvailableSlotsByType(slotType)
        );
    }

    // UPDATE SLOT
    @PutMapping("/{id}")
    public ResponseEntity<ParkingSlotResponse> updateSlot(
            @PathVariable Long id,
            @Valid @RequestBody ParkingSlotRequest request) {

        return ResponseEntity.ok(
                parkingSlotService.updateSlot(id, request)
        );
    }

    // UPDATE SLOT STATUS
    @PatchMapping("/{id}/status")
    public ResponseEntity<ParkingSlotResponse>
    updateSlotStatus(
            @PathVariable Long id,
            @RequestParam ParkingSlotStatus status) {

        return ResponseEntity.ok(
                parkingSlotService
                        .updateSlotStatus(id, status)
        );
    }

    // DELETE SLOT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(
            @PathVariable Long id) {

        parkingSlotService.deleteSlot(id);

        return ResponseEntity.noContent().build();
    }
}