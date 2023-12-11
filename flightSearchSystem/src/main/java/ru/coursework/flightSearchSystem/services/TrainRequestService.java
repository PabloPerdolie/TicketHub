package ru.coursework.flightSearchSystem.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.coursework.flightSearchSystem.entities.TrainRequest;
import ru.coursework.flightSearchSystem.repositories.TrainRequestRepository;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainRequestService {

    private final TrainRequestRepository repository;

    public void saveRequest(TrainRequest trainRequest) {
        repository.save(trainRequest);
    }

    public List<TrainRequest> findAll() {
        return repository.findAll();
    }

}
