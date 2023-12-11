package ru.coursework.flightSearchSystem.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.TextNode;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class AviaService {

    public String findIATACode(String city) throws IOException {
        String json = new String(Files.readAllBytes(Paths.get(
                "src/main/resources/static/iatacodescities.json")));
        JSONArray airports = new JSONArray(json); // Создаем массив JSON объектов из содержимого файла

        for (int i = 0; i < airports.length(); i++) {
            JSONObject airport = airports.getJSONObject(i);
            if (airport != null && airport.optString("name").equals(city)) {
                return airport.optString("code"); // Возвращаем IATA код для найденного города
            }
        }
        return "City not found"; // Если город не найден, возвращаем null
    }

    public String getCompanyNameByCode(String code) throws IOException {
        String json = new String(Files.readAllBytes(Paths.get(
                "src/main/resources/static/aviacompanies.json")));
        JSONArray companies = new JSONArray(json); // Создаем массив JSON объектов из содержимого файла

        for (int i = 0; i < companies.length(); i++) {
            JSONObject company = companies.getJSONObject(i);

            if (company.optString("code").equals(code)) {
                return company.optString("name");
            }
        }
        return null;
    }

    public void convertCompanyCodeToName(JsonNode dataNode) throws IOException {

        for (int i = 0; i < dataNode.size(); i++) {
            JsonNode airlineNode = dataNode.get(i);
            String name = getCompanyNameByCode(dataNode.get(i).get("airline").asText());
            TextNode newAirlineNode = new TextNode(name);

            ((ObjectNode) airlineNode).set("airline", newAirlineNode);
        }
    }

    public void addIATACodeOfAirline(JsonNode dataNode) {
        for (int i = 0; i < dataNode.size(); i++) {
            TextNode newAirlineNode = new TextNode(dataNode.get(i).get("airline").asText());
            ((ObjectNode) dataNode.get(i)).set("IATA", newAirlineNode);
        }
    }
}
