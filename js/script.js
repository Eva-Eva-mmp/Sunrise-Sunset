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


  
document.addEventListener('DOMContentLoaded', function() {
  // Auswahl der Elemente, die das Popup triggern
  const datumElements = document.querySelectorAll('.datum, .pfeil');

  // Popup-Element
  const popup = document.getElementById('popup');

  // Funktion, um das Popup zu zeigen
  function showPopup() {
      popup.classList.add('show');
  }

  // Event Listener hinzufügen
  datumElements.forEach(element => {
      element.addEventListener('click', showPopup);
  });
});





