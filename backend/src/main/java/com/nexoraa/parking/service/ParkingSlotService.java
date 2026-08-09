package com.nexoraa.parking.service;


import com.nexoraa.parking.dto.ParkingSlotRequest;
import com.nexoraa.parking.dto.ParkingSlotResponse;
import com.nexoraa.parking.entity.ParkingSlot;
import com.nexoraa.parking.entity.ParkingSlotStatus;
import com.nexoraa.parking.entity.ParkingSlotType;
import com.nexoraa.parking.exception.BadRequestException;
import com.nexoraa.parking.exception.ResourceNotFoundException;
import com.nexoraa.parking.repository.ParkingSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParkingSlotService {

    private final ParkingSlotRepository parkingSlotRepository;

    // CREATE PARKING SLOT
    public ParkingSlotResponse createSlot(ParkingSlotRequest request) {

        if (parkingSlotRepository.existsBySlotNumber(
                request.getSlotNumber())) {

            throw new BadRequestException(
                    "Parking slot already exists with number: "
                            + request.getSlotNumber()
            );
        }

        ParkingSlot slot = ParkingSlot.builder()
                .slotNumber(request.getSlotNumber().toUpperCase())
                .slotType(request.getSlotType())
                .status(ParkingSlotStatus.AVAILABLE)
                .floor(request.getFloor())
                .description(request.getDescription())
                .build();

        ParkingSlot savedSlot = parkingSlotRepository.save(slot);

        return mapToResponse(savedSlot);
    }

    // GET ALL SLOTS
    public List<ParkingSlotResponse> getAllSlots() {

        return parkingSlotRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET SLOT BY ID
    public ParkingSlotResponse getSlotById(Long id) {

        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking slot not found with id: " + id
                        )
                );

        return mapToResponse(slot);
    }

    // GET AVAILABLE SLOTS
    public List<ParkingSlotResponse> getAvailableSlots() {

        return parkingSlotRepository
                .findByStatus(ParkingSlotStatus.AVAILABLE)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET AVAILABLE SLOTS BY TYPE
    public List<ParkingSlotResponse> getAvailableSlotsByType(
            ParkingSlotType slotType) {

        return parkingSlotRepository
                .findBySlotTypeAndStatus(
                        slotType,
                        ParkingSlotStatus.AVAILABLE
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // UPDATE SLOT
    public ParkingSlotResponse updateSlot(
            Long id,
            ParkingSlotRequest request) {

        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking slot not found with id: " + id
                        )
                );

        // Check duplicate slot number
        if (!slot.getSlotNumber()
                .equalsIgnoreCase(request.getSlotNumber())
                && parkingSlotRepository.existsBySlotNumber(
                request.getSlotNumber())) {

            throw new BadRequestException(
                    "Another parking slot already exists with number: "
                            + request.getSlotNumber()
            );
        }

    
        if (slot.getStatus() == ParkingSlotStatus.OCCUPIED
                && slot.getSlotType() != request.getSlotType()) {

            throw new BadRequestException(
                    "Cannot change slot type while the slot is occupied"
            );
        }

        slot.setSlotNumber(
                request.getSlotNumber().toUpperCase()
        );

        slot.setSlotType(request.getSlotType());
        slot.setFloor(request.getFloor());
        slot.setDescription(request.getDescription());

        ParkingSlot updatedSlot =
                parkingSlotRepository.save(slot);

        return mapToResponse(updatedSlot);
    }

    // CHANGE SLOT STATUS
    public ParkingSlotResponse updateSlotStatus(
            Long id,
            ParkingSlotStatus status) {

        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking slot not found with id: " + id
                        )
                );

        
    
        if (slot.getStatus() == ParkingSlotStatus.OCCUPIED
                && status == ParkingSlotStatus.AVAILABLE) {

            throw new BadRequestException(
                    "Occupied slot cannot be manually marked as available"
            );
        }

        slot.setStatus(status);

        ParkingSlot updatedSlot =
                parkingSlotRepository.save(slot);

        return mapToResponse(updatedSlot);
    }

    // DELETE SLOT
    public void deleteSlot(Long id) {

        ParkingSlot slot = parkingSlotRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Parking slot not found with id: " + id
                        )
                );

        if (slot.getStatus() == ParkingSlotStatus.OCCUPIED) {

            throw new BadRequestException(
                    "Cannot delete an occupied parking slot"
            );
        }

        parkingSlotRepository.delete(slot);
    }

    // ENTITY → RESPONSE DTO
    private ParkingSlotResponse mapToResponse(
            ParkingSlot slot) {

        return ParkingSlotResponse.builder()
                .id(slot.getId())
                .slotNumber(slot.getSlotNumber())
                .slotType(slot.getSlotType())
                .status(slot.getStatus())
                .floor(slot.getFloor())
                .description(slot.getDescription())
                .build();
    }
}