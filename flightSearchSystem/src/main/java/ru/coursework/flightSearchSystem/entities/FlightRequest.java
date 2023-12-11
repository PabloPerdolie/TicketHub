package ru.coursework.flightSearchSystem.entities;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "flight_request")
public class FlightRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String origin;
    String destination;
    LocalDate departure_at;
    LocalDate return_at;
    LocalDate created_at;

    long person_id;
}
