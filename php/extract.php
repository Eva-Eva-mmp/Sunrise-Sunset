<?php

function fetchWeatherData() {
    $url = "https://api.sunrise-sunset.org/json?lat=47.3786&lng=8.5400&tzid=europe/zurich&date=today";

    // Initialisiert eine cURL-Sitzung
    $ch = curl_init($url);

    // Setzt Optionen
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Führt die cURL-Sitzung aus und erhält den Inhalt
    $response = curl_exec($ch);

    // Schließt die cURL-Sitzung
    curl_close($ch);

    // Dekodiert die JSON-Antwort und gibt Daten zurück
    // echo $response;
    return json_decode($response, true);
    //echo $response;
}

// Gibt die Daten zurück, wenn dieses Skript eingebunden ist
return fetchWeatherData();
?>
