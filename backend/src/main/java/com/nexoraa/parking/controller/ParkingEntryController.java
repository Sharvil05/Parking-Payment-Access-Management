package com.nexoraa.parking.controller;

import com.nexoraa.parking.dto.ParkingEntryRequest;
import com.nexoraa.parking.dto.ParkingEntryResponse;
import com.nexoraa.parking.service.ParkingEntryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
@RequiredArgsConstructor
public class ParkingEntryController {

    private final ParkingEntryService parkingEntryService;

    @PostMapping("/entry")
    public ResponseEntity<ParkingEntryResponse> vehicleEntry(
            @Valid @RequestBody ParkingEntryRequest request) {

        return ResponseEntity.ok(
                parkingEntryService.vehicleEntry(request)
        );
    }

    @GetMapping("/active")
    public ResponseEntity<List<ParkingEntryResponse>>
    getActiveSessions() {

        return ResponseEntity.ok(
                parkingEntryService.getActiveSessions()
        );
    }
}