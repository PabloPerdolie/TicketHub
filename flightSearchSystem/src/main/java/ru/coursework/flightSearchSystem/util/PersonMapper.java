package ru.coursework.flightSearchSystem.util;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import ru.coursework.flightSearchSystem.dto.PersonDTO;
import ru.coursework.flightSearchSystem.entities.Person;

@Mapper
public interface PersonMapper {

    PersonMapper INSTANCE = Mappers.getMapper(PersonMapper.class);

    PersonDTO personToPersonDTO(Person person);

    Person personDTOtoPerson(PersonDTO personDTO);

}
