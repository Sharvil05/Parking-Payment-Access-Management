package com.nexoraa.parking.service;


import com.nexoraa.parking.dto.ParkingEntryRequest;
import com.nexoraa.parking.dto.ParkingEntryResponse;
import com.nexoraa.parking.entity.*;
import com.nexoraa.parking.exception.BadRequestException;
import com.nexoraa.parking.exception.ResourceNotFoundException;
import com.nexoraa.parking.repository.ParkingSessionRepository;
import com.nexoraa.parking.repository.ParkingSlotRepository;
import com.nexoraa.parking.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParkingEntryService {

    private final VehicleRepository vehicleRepository;
    private final ParkingSlotRepository parkingSlotRepository;
    private final ParkingSessionRepository parkingSessionRepository;

    @Transactional
    public ParkingEntryResponse vehicleEntry(
            ParkingEntryRequest request) {

        String vehicleNumber =
                request.getVehicleNumber().trim().toUpperCase();

        // 1. Find vehicle
        Vehicle vehicle = vehicleRepository
                .findByVehicleNumber(vehicleNumber)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Vehicle not found with number: "
                                        + vehicleNumber
                        )
                );

        // 2. Check active parking session
        boolean alreadyParked =
                parkingSessionRepository
                        .existsByVehicleAndStatus(
                                vehicle,
                                ParkingSessionStatus.ACTIVE
                        );

        if (alreadyParked) {
            throw new BadRequestException(
                    "Vehicle is already inside the parking area"
            );
        }

        // 3. Convert vehicle type to parking slot type
        ParkingSlotType slotType =
                getSlotType(vehicle.getVehicleType());

        // 4. Find available slot
        ParkingSlot parkingSlot =
                parkingSlotRepository
                        .findBySlotTypeAndStatus(
                                slotType,
                                ParkingSlotStatus.AVAILABLE
                        )
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new BadRequestException(
                                        "No available "
                                                + slotType
                                                + " parking slot"
                                )
                        );

        // 5. Create parking session
        ParkingSession session = ParkingSession.builder()
                .vehicle(vehicle)
                .parkingSlot(parkingSlot)
                .entryTime(LocalDateTime.now())
                .status(ParkingSessionStatus.ACTIVE)
                .build();

        // 6. Mark slot as occupied
        parkingSlot.setStatus(
                ParkingSlotStatus.OCCUPIED
        );

        parkingSlotRepository.save(parkingSlot);

        // 7. Save session
        ParkingSession savedSession =
                parkingSessionRepository.save(session);

        // 8. Return response
        return ParkingEntryResponse.builder()
                .sessionId(savedSession.getId())
                .vehicleNumber(
                        vehicle.getVehicleNumber()
                )
                .vehicleType(
                        vehicle.getVehicleType().name()
                )
                .slotNumber(
                        parkingSlot.getSlotNumber()
                )
                .floor(
                        parkingSlot.getFloor()
                )
                .entryTime(
                        savedSession.getEntryTime()
                )
                .status(
                        savedSession.getStatus()
                )
                .build();
    }

    private ParkingSlotType getSlotType(
        VehicleType vehicleType) {

    return switch (vehicleType) {

        case BIKE -> ParkingSlotType.BIKE;

        case CAR -> ParkingSlotType.CAR;

        case SUV -> ParkingSlotType.SUV;

        case TRUCK -> ParkingSlotType.TRUCK;
    };
}
public List<ParkingEntryResponse> getActiveSessions() {

    return parkingSessionRepository
            .findByStatus(ParkingSessionStatus.ACTIVE)
            .stream()
            .map(session -> {

                ParkingSlot slot =
                        session.getParkingSlot();

                Vehicle vehicle =
                        session.getVehicle();

                return ParkingEntryResponse.builder()
                        .sessionId(session.getId())
                        .vehicleNumber(
                                vehicle.getVehicleNumber()
                        )
                        .vehicleType(
                                vehicle.getVehicleType().name()
                        )
                        .slotNumber(
                                slot.getSlotNumber()
                        )
                        .floor(
                                slot.getFloor()
                        )
                        .entryTime(
                                session.getEntryTime()
                        )
                        .status(
                                session.getStatus()
                        )
                        .build();
            })
            .toList();
}

}