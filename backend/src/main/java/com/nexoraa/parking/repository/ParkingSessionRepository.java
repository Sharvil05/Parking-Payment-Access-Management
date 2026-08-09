package com.nexoraa.parking.repository;


import com.nexoraa.parking.entity.ParkingSession;
import com.nexoraa.parking.entity.ParkingSessionStatus;
import com.nexoraa.parking.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingSessionRepository
        extends JpaRepository<ParkingSession, Long> {

    Optional<ParkingSession> findByVehicleAndStatus(
            Vehicle vehicle,
            ParkingSessionStatus status
    );

    List<ParkingSession> findByStatus(ParkingSessionStatus status);

    boolean existsByVehicleAndStatus(
            Vehicle vehicle,
            ParkingSessionStatus status
    );

    long countByStatus(ParkingSessionStatus status);
}