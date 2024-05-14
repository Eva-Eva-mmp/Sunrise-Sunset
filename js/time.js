// Best Practice:
// - Fetch in eine Funktion packen
// - Fetch asynchron ausführen
let url = 'https://595011-3.web.fhgr.ch/php/unload.php';
let data;

async function fetchData(url) {
     try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
 }

fetchData(url);



function convertSunsetTo24Hour(timeString) {
  let [hours, minutes] = timeString.split(':');
  minutes = minutes.replace(' PM', '');
  if (hours !== '12') {
      hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}`;
}

function subtractMinutesFromTime(timeString, minutesToSubtract) {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes - minutesToSubtract);

  return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
}

// Funktion zum Entfernen von Sekunden aus der Zeitangabe
function removeSeconds(timeString) {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
}

async function init(datum) {
  let response = await fetch(url);
  let rawdata = await response.json();
  let data = rawdata.filter(item => item.date === datum);

  

console.log(data);

  // Konvertieren der Sunset-Zeit und Speichern als Ursprungswert
  const originalSunsetTime = convertSunsetTo24Hour(data[0]['sunset']);
  document.getElementById('sunset').innerHTML = originalSunsetTime;

  // Sonnenaufgangszeit ohne Sekunden formatieren und anzeigen
  const formattedSunriseTime = removeSeconds(data[0]['sunrise']);
  document.getElementById('sunrise').innerHTML = formattedSunriseTime;

  // Event Listener für die Buttons
  document.querySelectorAll('.button-section').forEach(button => {
      button.addEventListener('click', function() {
          document.querySelectorAll('.button-section').forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');

          const minutes = parseInt(this.querySelector('.time').textContent, 10);
          const newTime = subtractMinutesFromTime(originalSunsetTime, minutes);
          document.getElementById('sunset').innerHTML = newTime;
      });
  });

  // Standardmäßig 30 Minuten subtrahieren und Button markieren

  const defaultButton = document.querySelector('.active'); // Stellen Sie sicher, dass dies der 30-Minuten-Button ist.
  const defaultMinutes = parseInt(defaultButton.querySelector('.time').textContent, 10);
  const newTime = subtractMinutesFromTime(originalSunsetTime, defaultMinutes);
  document.getElementById('sunset').innerHTML = newTime
}



document.addEventListener("DOMContentLoaded", (event) => {
    init("2024-05-04");
});


  