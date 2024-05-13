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
    labels: ['Jan.', 'Febr.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],  
    datasets: [
    {
      label: 'Sonnenaufgang',
      data: [12, 19, 3, 5, 2, 3, 24],
      borderWidth: 1,
      borderColor: 'rgba(242, 175, 94, 1)',
      backgroundColor: 'rgba(242, 175, 94, 1)',
      pointRadius: 0, // Orange
    },
    {
      label: 'Sonnenuntergang',
      data: [7, 11, 5, 8, 3, 7],
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
          color: 'black',
          // Erstellen von benutzerdefinierten Ticks, die jede Stunde von 01:00 bis 00:00 darstellen
          callback: function(value, index, values) {
            // Generiert Uhrzeiten von 01:00 bis 24:00, wobei 24:00 als 00:00 dargestellt wird
            const hour = (index + 1) % 24;
            return `${hour === 0 ? '00' : hour.toString().padStart(2, '0')}:00`;
          },
          stepSize: 1,  // Jeder Tick entspricht einer Stunde
          min: 1,       // Beginnend bei 01:00
          max: 24       // Endend bei 00:00
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
          boxWidth: 20,
          padding: 20,
        }
      }
    }
  }
});
  



//kalender neu

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
              "August", "September", "Oktober", "November", "Dezember"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});



