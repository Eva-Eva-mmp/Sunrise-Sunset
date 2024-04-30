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

//gespeicherte Daten sind in der Variable data gespeichert
async function init() {
    let response = await fetch(url);
    data = await response.json();
    console.log(data); 
}

init();

const linienDiagramm = document.querySelector('#linienDiagramm');

new Chart(linienDiagramm, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});