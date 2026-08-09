package com.nexoraa.parking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "parking_slots",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "slot_number")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "slot_number", nullable = false, unique = true, length = 20)
    private String slotNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParkingSlotType slotType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ParkingSlotStatus status;

    @Column(nullable = false)
    private Integer floor;

    @Column(length = 255)
    private String description;
}