package ru.coursework.flightSearchSystem.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String username;

    String email;

    String password;

    @Enumerated(EnumType.STRING)
    Role role;


//    @OneToMany(mappedBy = "person")
//    List<TrainRequest> trainRequests;
}
