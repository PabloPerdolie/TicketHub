package ru.coursework.flightSearchSystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.coursework.flightSearchSystem.entities.FlightRequest;

@Repository
public interface FlightRequestRepository extends JpaRepository<FlightRequest, Long> {
}

