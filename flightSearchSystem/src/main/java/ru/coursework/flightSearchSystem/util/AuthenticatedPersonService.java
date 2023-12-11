package ru.coursework.flightSearchSystem.util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.coursework.flightSearchSystem.entities.Person;
import ru.coursework.flightSearchSystem.security.PersonDetails;

@Service
public class AuthenticatedPersonService {
    public Person getAuthenticatedPerson() {
        PersonDetails personDetails = (PersonDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        return personDetails.getPerson();
    }
}
