package com.nexoraa.parking.controller;

import com.nexoraa.parking.dto.ReportResponse;
import com.nexoraa.parking.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/summary")
    public ResponseEntity<ReportResponse> getReportSummary() {

        return ResponseEntity.ok(
                reportService.getReportSummary()
        );
    }
}