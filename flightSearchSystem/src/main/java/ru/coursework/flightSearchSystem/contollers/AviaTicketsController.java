package ru.coursework.flightSearchSystem.contollers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import ru.coursework.flightSearchSystem.entities.Person;
import ru.coursework.flightSearchSystem.services.AviaService;
import ru.coursework.flightSearchSystem.entities.FlightRequest;
import ru.coursework.flightSearchSystem.services.FlightRequestService;
import ru.coursework.flightSearchSystem.util.AuthenticatedPersonService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AviaTicketsController {

    private final AviaService aviaService;
    private final AuthenticatedPersonService authenticatedPersonService;
    private final FlightRequestService flightRequestService;

    /**
     * @param flightRequest json вида {
     *                      "origin": "Город вылета",
     *                      "destination": "Город прибытия",
     *                      "departure_at": "дата вылета",
     *                      "return_at": "дата возвращения"
     *                      }
     * @return JsonNode вида {
     * "origin": "MOW",
     * "destination": "LED",
     * "origin_airport": "VKO",
     * "destination_airport": "LED",
     * "price": 6790,
     * "airline": "UT",
     * "flight_number": "381",
     * "departure_at": "2023-06-05T19:10:00+03:00",
     * "return_at": "2023-06-10T21:35:00+03:00",
     * "transfers": 0,
     * "return_transfers": 0,
     * "duration": 170,
     * "duration_to": 80,
     * "duration_back": 90,
     * "link": "/search/MOW0506LED10061?t=UT16859814001685986200000080VKOLED16864221001686427500000090LEDVKO_6547ad8b43ccbf1e95eb0961fd88e5c8_6790&search_date=04052023&expected_price_uuid=166699b4-25b4-49a5-a9a3-3243659a358d&expected_price_currency=rub"
     * "IATA": "код аэропорта"
     * }
     * @throws JsonProcessingException
     */

    @PostMapping("/getFlights")
    public JsonNode getFlights(@RequestBody FlightRequest flightRequest) throws IOException {

        String origin = aviaService.findIATACode(flightRequest.getOrigin());
        String destination = aviaService.findIATACode(flightRequest.getDestination());

        String urlToApi = "https://api.travelpayouts.com/aviasales/v3/prices_for_dates?" +
                "origin=" + origin + "&destination=" + destination +
                "&departure_at=" + flightRequest.getDeparture_at() +
                "&return_at=" + flightRequest.getReturn_at() +
                "&sorting=price&direct=true&limit=10&" +
                "token=75d4ad65141114e0c1fb85b310925884";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(urlToApi, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(result);

        JsonNode dataNode = jsonNode.get("data");

        aviaService.addIATACodeOfAirline(dataNode);
        aviaService.convertCompanyCodeToName(dataNode);

        flightRequest.setCreated_at(LocalDate.now());
        flightRequest.setPerson_id(authenticatedPersonService.getAuthenticatedPerson().getId());

        flightRequestService.saveRequest(flightRequest);

        return dataNode;
    }


    /**
     * Метод получения истории поиска авиабилктов конкретного пользователя
     *
     * @return json вида  [
     *     {
     *         "id": 2,
     *         "origin": "Москва",
     *         "destination": "Казань",
     *         "departure_at": "2023-06-05",
     *         "return_at": "2023-06-06",
     *         "created_at": "2023-05-06",
     *         "person_id": 2
     *     }
     * ]
     */
    @GetMapping("/get_flight_search_history")
    public List<FlightRequest> getSearchHistory() {
        long personId = authenticatedPersonService.getAuthenticatedPerson().getId();

        List<FlightRequest> flightRequests = new ArrayList<>();

        for(FlightRequest flight : flightRequestService.findAll()) {
            if (flight.getPerson_id() == personId)
                flightRequests.add(flight);
        }
        return flightRequests;
    }
}