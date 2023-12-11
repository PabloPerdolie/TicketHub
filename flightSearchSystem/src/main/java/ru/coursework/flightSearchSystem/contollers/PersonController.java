package ru.coursework.flightSearchSystem.contollers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.coursework.flightSearchSystem.dto.PersonDTO;
import ru.coursework.flightSearchSystem.entities.Person;
import ru.coursework.flightSearchSystem.services.PersonService;
import ru.coursework.flightSearchSystem.util.AuthenticatedPersonService;
import ru.coursework.flightSearchSystem.util.PersonMapper;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;
    private final PersonMapper personMapper = PersonMapper.INSTANCE;
    private final AuthenticatedPersonService authenticatedPersonService;

    /**
     *
     * @return список всех пользователей
     */
    @GetMapping("/people")
    public List<PersonDTO> findAll() {
        return personService.findAll().stream()
                .map(personMapper::personToPersonDTO).collect(Collectors.toList());
    }

    /**
     * метод возвращает данные о текущем пользователе
     *
     * @return json вида {
     *     "id": 1,
     *     "username": "newtest",
     *     "email": "newtest@mail.ru",
     *     "password": "$2a$10$lmwydtV31LlH0Dj5TtCpZOchKmL.ODhBG2kPoQHWNtLf6fw9Wh/w6",
     *     "role": "USER"
     * }
     */
    @GetMapping("/get_person")
    public Person getPerson() {
        return authenticatedPersonService.getAuthenticatedPerson();
    }
}
