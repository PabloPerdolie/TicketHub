package ru.coursework.flightSearchSystem.entities;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;

public enum Role {
    @JsonEnumDefaultValue
    USER,
    ADMIN
}
