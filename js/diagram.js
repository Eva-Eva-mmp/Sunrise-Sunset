// Best Practice:
// - Fetch in eine Funktion packen
// - Fetch asynchron ausführen
/*let url = 'https://595011-3.web.fhgr.ch/php/unload.php';
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

fetchData(url);*/


const linienDiagramm = document.querySelector('#linienDiagramm');

new Chart(linienDiagramm, {
  type: 'line',
  data: {
    labels: ['Jan.', 'Febr.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],  
    datasets: [
    {
      label: 'Sonnenaufgang',
      data: [8.06, 7.30, 6.36, 6.34, 5.46, 5.26, 5.43, 6.21, 7.02, 7.43, 7.29, 8.04],
      borderWidth: 1,
      borderColor: 'rgba(242, 175, 94, 1)',
      backgroundColor: 'rgba(242, 175, 94, 1)',
      pointRadius: 0, // Orange
    },
    {
      label: 'Sonnenuntergang',
      data: [17.03, 17.49, 18.33, 20.16, 20.57, 21.26, 21.20, 20.39, 19.39, 18.39, 16.51, 16.37],
      borderWidth: 1,
      backgroundColor: 'rgba(82, 104, 138, 100)',
      borderColor: 'rgba(82, 104, 138, 100)',
      pointRadius: 0, // Blau
    }
  ]
  },
  options: {
    responsive: true,  // Macht das Diagramm responsiv
    maintainAspectRatio: true,  // Beibehaltung des Aspektverhältnisses
    scales: {
        y: {
          beginAtZero: false,
          ticks: {
            // Umrechnung der Dezimalzeit in Stunden und Minuten
            callback: function(value, index, values) {
              let hour = Math.floor(value);
              let minutes = Math.floor((value - hour) * 60);
              return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            },
            stepSize: 1,  // Jeder Tick entspricht einer Stunde
            min: 1,       // Minimaler Wert auf der y-Achse basierend auf den frühesten Sonnenaufgang
            max: 24       // Maximaler Wert auf der y-Achse basierend auf dem spätesten Sonnenuntergang
          }
      },

      x: {
        ticks: {
          color: 'black' // Setzt die Textfarbe der X-Achse auf Schwarz
        }
      }
    },
    
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          color: 'black',  // Setzt die Textfarbe der Legende auf Schwarz
          boxWidth: 40,
          padding: 20,
        }
      }
    }
  }
});
  