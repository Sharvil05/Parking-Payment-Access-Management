package com.nexoraa.parking.service;


import com.nexoraa.parking.dto.ParkingExitResponse;
import com.nexoraa.parking.entity.*;
import com.nexoraa.parking.exception.BadRequestException;
import com.nexoraa.parking.exception.ResourceNotFoundException;
import com.nexoraa.parking.repository.ParkingSessionRepository;
import com.nexoraa.parking.repository.ParkingSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ParkingExitService {

    private final ParkingSessionRepository parkingSessionRepository;
    private final ParkingSlotRepository parkingSlotRepository;

    @Transactional
    public ParkingExitResponse vehicleExit(Long sessionId) {

        // 1. Find parking session
        ParkingSession session =
                parkingSessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Parking session not found with id: "
                                                + sessionId
                                )
                        );

        // 2. Check session status
        if (session.getStatus()
                != ParkingSessionStatus.ACTIVE) {

            throw new BadRequestException(
                    "Parking session is not active"
            );
        }

        // 3. Get exit time
        LocalDateTime exitTime = LocalDateTime.now();

        // 4. Calculate duration
        long durationMinutes =
                Duration.between(
                        session.getEntryTime(),
                        exitTime
                ).toMinutes();

        // Make sure minimum duration is 1 minute
        if (durationMinutes < 1) {
            durationMinutes = 1;
        }

        // 5. Calculate parking fee
        BigDecimal parkingFee =
                calculateParkingFee(
                        session.getVehicle().getVehicleType(),
                        durationMinutes
                );

        // 6. Update session
        session.setExitTime(exitTime);
        session.setDurationMinutes(durationMinutes);
        session.setParkingFee(parkingFee);
        session.setStatus(
                ParkingSessionStatus.COMPLETED
        );

        // 7. Make slot available
        ParkingSlot parkingSlot =
                session.getParkingSlot();

        parkingSlot.setStatus(
                ParkingSlotStatus.AVAILABLE
        );

        parkingSlotRepository.save(parkingSlot);

        // 8. Save session
        ParkingSession updatedSession =
                parkingSessionRepository.save(session);

        // 9. Return response
        return ParkingExitResponse.builder()
                .sessionId(updatedSession.getId())
                .vehicleNumber(
                        updatedSession
                                .getVehicle()
                                .getVehicleNumber()
                )
                .vehicleType(
                        updatedSession
                                .getVehicle()
                                .getVehicleType()
                                .name()
                )
                .slotNumber(
                        parkingSlot.getSlotNumber()
                )
                .entryTime(
                        updatedSession.getEntryTime()
                )
                .exitTime(
                        updatedSession.getExitTime()
                )
                .durationMinutes(
                        updatedSession.getDurationMinutes()
                )
                .parkingFee(
                        updatedSession.getParkingFee()
                )
                .status(
                        updatedSession.getStatus()
                )
                .build();
    }

    private BigDecimal calculateParkingFee(
            VehicleType vehicleType,
            long durationMinutes) {

        /*
         * Convert minutes into started hours.
         *
         * Example:
         * 30 minutes  -> 1 hour
         * 60 minutes  -> 1 hour
         * 61 minutes  -> 2 hours
         * 120 minutes -> 2 hours
         */

        long hours =
                (durationMinutes + 59) / 60;

        if (hours < 1) {
            hours = 1;
        }

        BigDecimal firstHourFee;
        BigDecimal additionalHourFee;

        switch (vehicleType) {

            case BIKE:
                firstHourFee = BigDecimal.valueOf(20);
                additionalHourFee =
                        BigDecimal.valueOf(10);
                break;

            case CAR:
                firstHourFee = BigDecimal.valueOf(40);
                additionalHourFee =
                        BigDecimal.valueOf(20);
                break;

            case SUV:
                firstHourFee = BigDecimal.valueOf(50);
                additionalHourFee =
                        BigDecimal.valueOf(25);
                break;

            case TRUCK:
                firstHourFee = BigDecimal.valueOf(70);
                additionalHourFee =
                        BigDecimal.valueOf(30);
                break;

            default:
                throw new BadRequestException(
                        "Unsupported vehicle type: "
                                + vehicleType
                );
        }

        if (hours == 1) {
            return firstHourFee;
        }

        return firstHourFee.add(
                additionalHourFee.multiply(
                        BigDecimal.valueOf(hours - 1)
                )
        );
    }
}