package com.nexoraa.parking.repository;

import com.nexoraa.parking.entity.ParkingSlot;
import com.nexoraa.parking.entity.ParkingSlotStatus;
import com.nexoraa.parking.entity.ParkingSlotType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {

    Optional<ParkingSlot> findBySlotNumber(String slotNumber);

    boolean existsBySlotNumber(String slotNumber);

    List<ParkingSlot> findByStatus(ParkingSlotStatus status);

    List<ParkingSlot> findBySlotTypeAndStatus(
            ParkingSlotType slotType,
            ParkingSlotStatus status
    );

    long countByStatus(ParkingSlotStatus status);
}