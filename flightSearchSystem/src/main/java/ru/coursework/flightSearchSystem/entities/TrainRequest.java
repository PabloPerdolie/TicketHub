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
@Table(name = "train_request")
public class TrainRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(name = "fromm")
    String from;
    @Column(name = "too")
    String to;
    @Column(name = "departure_at")
    LocalDate departureAt;
    @Column(name = "created_at")
    LocalDate createdAt;

    long person_id;
}