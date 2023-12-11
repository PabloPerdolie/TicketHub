package ru.coursework.flightSearchSystem.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.coursework.flightSearchSystem.entities.Person;
import ru.coursework.flightSearchSystem.repositories.PersonRepository;
import ru.coursework.flightSearchSystem.util.PersonMapper;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper = PersonMapper.INSTANCE;

    public List<Person> findAll() {
        return personRepository.findAll();
    }

    public void delete(long id) {
        personRepository.delete(getById(id));
    }

    public Person getById(long id) {
        Optional<Person> person = personRepository.findById(id);
        return person.get();
    }

    public Person update(long id, Person person) {
        return personRepository.save(person);
    }

}
