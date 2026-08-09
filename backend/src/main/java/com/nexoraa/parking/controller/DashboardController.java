package com.nexoraa.parking.controller;


import com.nexoraa.parking.dto.DashboardResponse;
import com.nexoraa.parking.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardResponse> getDashboardSummary() {

        return ResponseEntity.ok(
                dashboardService.getDashboardSummary()
        );
    }
}