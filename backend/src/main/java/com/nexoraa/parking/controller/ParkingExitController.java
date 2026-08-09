package com.nexoraa.parking.controller;


import com.nexoraa.parking.dto.ParkingExitResponse;
import com.nexoraa.parking.service.ParkingExitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parking")
@RequiredArgsConstructor
public class ParkingExitController {

    private final ParkingExitService parkingExitService;

    @PostMapping("/exit/{sessionId}")
    public ResponseEntity<ParkingExitResponse> vehicleExit(
            @PathVariable Long sessionId) {

        return ResponseEntity.ok(
                parkingExitService.vehicleExit(sessionId)
        );
    }
}