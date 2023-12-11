package ru.coursework.flightSearchSystem.services;

import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

@Service
public class TrainService {

//    public void deleteBusStops() throws IOException {
//        String json = new String(Files.readAllBytes(Paths.get("src/main/resources/static/staioncodes.json")));
//        JSONObject stations = new JSONObject(json);
//        JSONArray countries = stations.getJSONArray("countries");
//
//        for (int i = 0; i < countries.length(); i++) {
//            JSONObject country = countries.getJSONObject(i);
//            JSONArray regions = country.getJSONArray("regions");
//
//            for (int j = 0; j < regions.length(); j++) {
//                JSONObject region = regions.getJSONObject(j);
//                JSONArray settlements = region.getJSONArray("settlements");
//
//                for (int k = 0; k < settlements.length(); k++) {
//                    JSONObject settlement = settlements.getJSONObject(k);
//                    JSONArray stationsLowLevel = settlement.getJSONArray("stations");
//
//                    for (int l = 0; l < stationsLowLevel.length(); l++) {
//                        JSONObject stationLowLevel = stationsLowLevel.getJSONObject(l);
//
//
//                        if (!stationLowLevel.optString("station_type").equals("train_station")) {
//                            stationsLowLevel.remove(l);
//                            l--;
//                        }
//                    }
//                }
//            }
//        }
//
//        // Записываем изменения обратно в файл
//        try (FileWriter file = new FileWriter("src/main/resources/static/staioncodes.json")) {
//            file.write(stations.toString());
//        }
//    }

    public ArrayList<String> findCodeByName(String name) throws IOException {
        String json = new String(Files.readAllBytes(Paths.get("src/main/resources/static/staioncodes.json")));
        JSONObject stations = new JSONObject(json);
        JSONArray countries = stations.getJSONArray("countries");
        ArrayList<String> codes_list = new ArrayList<>();

        for (int i = 0; i < countries.length(); i++) {
            JSONObject country = countries.getJSONObject(i);
            JSONArray regions = country.getJSONArray("regions");

            for (int j = 0; j < regions.length(); j++) {
                JSONObject region = regions.getJSONObject(j);
                JSONArray settlements = region.getJSONArray("settlements");

                for (int k = 0; k < settlements.length(); k++) {
                    JSONObject settlement = settlements.getJSONObject(k);
                    JSONArray stationsLowLevel = settlement.getJSONArray("stations");

                    for (int l = 0; l < stationsLowLevel.length(); l++) {
                        JSONObject stationLowLevel = stationsLowLevel.getJSONObject(l);
                        if (stationLowLevel.optString("title").toLowerCase().contains(name.toLowerCase())) {
                            JSONObject codes = stationLowLevel.getJSONObject("codes");
                            codes_list.add(codes.optString("yandex_code"));
                        }
                    }
                }
            }
        }
        return codes_list;
    }

}