package ru.coursework.flightSearchSystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.coursework.flightSearchSystem.entities.Person;
import ru.coursework.flightSearchSystem.entities.TrainRequest;

@Repository
public interface TrainRequestRepository extends JpaRepository<TrainRequest, Long> {
}
