<?php

// Include the script 130_extract.php for raw data
$data = include('extract.php');

// Check if $data is an array
if (!is_array($data) || !isset($data['results'])) {
    // Handle the case where $data is not in the expected format
    // You can add logging or error handling here
    exit('Invalid data format');
}

// Extract 'results' from $data
$results = $data['results'];

// Initialize an array to store transformed data
$sunrise_sunset_data = [
    [
        'sunrise' => $results['sunrise'],
        'sunset' => $results['sunset'],
        'day_length' => $results['day_length']
    ]
    ];

// Encode the transformed data into JSON
$jsonData = json_encode(['sunrise_sunset_data' => $sunrise_sunset_data], JSON_PRETTY_PRINT);

// Output the JSON data
return $jsonData;
?>
