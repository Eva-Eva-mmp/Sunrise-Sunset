<?php

require_once 'config.php'; // Include the database configuration

// Function to save weather data to the database
function saveWeatherDataToDatabase($sunriseData, $pdo) {
    // SQL query to insert data into the sunriseandsunset table
    $sql = "INSERT INTO sunriseandsunset (date, sunrise, sunset) VALUES (?, ?, ?)";
    
    // Prepare the SQL statement
    $stmt = $pdo->prepare($sql);
    
    // Loop through the weather data and insert into the database
    foreach ($sunriseData as $date => $daten) {
        $sunrise = $daten['results']['sunrise'];
        $sunset = $daten['results']['sunset'];
        
        // Execute the prepared statement
        $stmt->execute([$date, $sunrise, $sunset]);
        
        // Check if the execution was successful
        if ($stmt->rowCount() === 0) {
            die('Error inserting data into the database.');
        }
    }
}

// Function to fetch and save yearly weather data
function fetchAndSaveYearlyWeatherData($pdo) {
    $year = 2024;
    $sunriseData = [];

    // Loop through each day of the year 2024
    for ($month = 1; $month <= 12; $month++) {
        for ($day = 1; $day <= cal_days_in_month(CAL_GREGORIAN, $month, $year); $day++) {
            $date = sprintf("%04d-%02d-%02d", $year, $month, $day);
            $sunriseData[$date] = fetchSunriseData($date);
        }
    }

    // Save the weather data in the database
    saveWeatherDataToDatabase($sunriseData, $pdo);
}

function fetchSunriseData($date) {
    $url = "https://api.sunrise-sunset.org/json?lat=47.3786&lng=8.5400&date=2024-05-22&tzid=europe/zurich&date=" . $date;

    // Initialize a cURL session
    $ch = curl_init($url);

    // Set options
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the cURL session and get the content
    $response = curl_exec($ch);

    // Close the cURL session
    curl_close($ch);

    // Decode the JSON response and return data
    return json_decode($response, true);
}

try {
    // Create a new PDO instance with the configuration from config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // Execute the function to fetch and save yearly weather data
    fetchAndSaveYearlyWeatherData($pdo);

    echo "Data successfully inserted.";
} catch (PDOException $e) {
    die("Connection to the database could not be established: " . $e->getMessage());
}
?>
