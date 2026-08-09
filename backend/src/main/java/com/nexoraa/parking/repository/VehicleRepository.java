package com.nexoraa.parking.repository;


import com.nexoraa.parking.entity.Vehicle;
import com.nexoraa.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);

    boolean existsByVehicleNumber(String vehicleNumber);

    List<Vehicle> findByOwner(User owner);

    List<Vehicle> findByVehicleNumberContainingIgnoreCase(String vehicleNumber);
}
