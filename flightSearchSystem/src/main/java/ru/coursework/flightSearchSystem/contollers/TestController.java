package ru.coursework.flightSearchSystem.contollers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Hello, from secured part";
    }
}
