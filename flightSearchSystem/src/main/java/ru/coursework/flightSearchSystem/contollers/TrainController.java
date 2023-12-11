package ru.coursework.flightSearchSystem.contollers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import ru.coursework.flightSearchSystem.entities.FlightRequest;
import ru.coursework.flightSearchSystem.entities.Person;
import ru.coursework.flightSearchSystem.services.TrainRequestService;
import ru.coursework.flightSearchSystem.services.TrainService;
import ru.coursework.flightSearchSystem.entities.TrainRequest;
import ru.coursework.flightSearchSystem.util.AuthenticatedPersonService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class TrainController {

    private final TrainService trainService;
    private final TrainRequestService trainRequestService;
    private final AuthenticatedPersonService authenticatedPersonService;
    private final EntityManager entityManager;

    /**
     * @param trainRequest вида {
     *                     "from": "Москва (Курский вокзал)",
     *                     "to": "Ростов-Главный",
     *                     "departureAt": "2023-06-03"
     *                     }
     * @return json вида {
     *         "thread": {
     *             "number": "126Э",
     *             "title": "Москва — Новороссийск",
     *             "short_title": "Москва — Новороссийск",
     *             "express_type": null,
     *             "transport_type": "train",
     *             "carrier": {
     *                 "code": 112,
     *                 "title": "РЖД/ФПК",
     *                 "codes": {
     *                     "sirena": null,
     *                     "iata": null,
     *                     "icao": null
     *                 },
     *                 "address": "Москва, ул. Новая Басманная , д. 2",
     *                 "url": "http://www.rzd.ru/",
     *                 "email": "info@rzd.ru",
     *                 "contacts": "Единая телефонная линия: +7 (800) 775-00-00 (звонок бесплатный из всех регионов РФ).",
     *                 "phone": "+7 (800) 775-00-00",
     *                 "logo": "https://yastat.net/s3/rasp/media/data/company/logo/logo.gif",
     *                 "logo_svg": null
     *             },
     *             "uid": "126YE_2_2",
     *             "vehicle": null,
     *             "transport_subtype": {
     *                 "title": null,
     *                 "code": null,
     *                 "color": null
     *             },
     *             "thread_method_link": "api.rasp.yandex.net/v3/thread/?date=2023-05-25&uid=126YE_2_2"
     *         },
     *         "stops": "",
     *         "from": {
     *             "type": "station",
     *             "title": "Москва (Казанский вокзал)",
     *             "short_title": "М-Казанская",
     *             "popular_title": "Казанский вокзал",
     *             "code": "s2000003",
     *             "station_type": "train_station",
     *             "station_type_name": "вокзал",
     *             "transport_type": "train"
     *         },
     *         "to": {
     *             "type": "station",
     *             "title": "Ростов-Главный",
     *             "short_title": "",
     *             "popular_title": "",
     *             "code": "s9612913",
     *             "station_type": "train_station",
     *             "station_type_name": "вокзал",
     *             "transport_type": "train"
     *         },
     *         "departure_platform": "",
     *         "arrival_platform": "",
     *         "departure_terminal": null,
     *         "arrival_terminal": null,
     *         "duration": 79440.0,
     *         "has_transfers": false,
     *         "tickets_info": {
     *             "et_marker": false,
     *             "places": []
     *         },
     *         "departure": "2023-05-25T00:45:00+03:00",
     *         "arrival": "2023-05-25T22:49:00+03:00",
     *         "start_date": "2023-05-25"
     *     }
     * @throws IOException
     */

    @PostMapping("/getTrains")
    public ArrayList<JsonNode> getTrains(@RequestBody TrainRequest trainRequest) throws IOException {

        ArrayList<String> from = trainService.findCodeByName(trainRequest.getFrom());
        ArrayList<String> to = trainService.findCodeByName(trainRequest.getTo());

        ArrayList<JsonNode> all_routes = new ArrayList<>();
        for (String code_from : from) {
            for (String code_to : to) {
                try {
                String urlToApi = "https://api.rasp.yandex.net/v3.0/search/?" +
                        "format=json" +
                        "&from=" + code_from +
                        "&to=" + code_to +
                        "&lang=ru_RU" +
                        "&page=1" +
                        "&date=" + trainRequest.getDepartureAt() +
                        "&apikey=bebbf02f-1a0e-4a7a-929b-ab294c15b831" +
                        "&system=yandex";

                RestTemplate restTemplate = new RestTemplate();
                String result = restTemplate.getForObject(urlToApi, String.class);

                ObjectMapper mapper = new ObjectMapper();
                JsonNode jsonNode = mapper.readTree(result);

                JsonNode dataNode = jsonNode.get("segments");
                all_routes.add(dataNode);
                trainRequest.setCreatedAt(LocalDate.now());
                trainRequest.setPerson_id(authenticatedPersonService.getAuthenticatedPerson().getId());

                trainRequestService.saveRequest(trainRequest);
                }
                catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }
        }
        return all_routes;
    }



    @GetMapping("/get_train_search_history")
    public List<TrainRequest> getSearchHistory() {
        long personId = authenticatedPersonService.getAuthenticatedPerson().getId();

        List<TrainRequest> trainRequests = new ArrayList<>();

        for(TrainRequest trainRequest : trainRequestService.findAll()) {
            if (trainRequest.getPerson_id() == personId)
                trainRequests.add(trainRequest);
        }
        return trainRequests;
    }
}
