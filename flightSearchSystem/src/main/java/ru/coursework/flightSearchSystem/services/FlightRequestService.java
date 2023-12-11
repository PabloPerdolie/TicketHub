package ru.coursework.flightSearchSystem.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.coursework.flightSearchSystem.entities.FlightRequest;
import ru.coursework.flightSearchSystem.entities.TrainRequest;
import ru.coursework.flightSearchSystem.repositories.FlightRequestRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightRequestService {

    private final FlightRequestRepository flightRequestRepository;

    public void saveRequest(FlightRequest flightRequest) {
        flightRequestRepository.save(flightRequest);
    }

    public List<FlightRequest> findAll() {
        return flightRequestRepository.findAll();
    }

}
