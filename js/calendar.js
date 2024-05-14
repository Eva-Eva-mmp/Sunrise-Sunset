
    //onst picked = document.getElementById("picked");
    const picked = document.getElementById("datumsanzeige");
    const month = document.getElementById("month");
    const calendar = document.getElementById("calendar");

    const DATE = new Date();
    let thisMonth = DATE.getMonth();
    let year = DATE.getFullYear();

    const MONTHS = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];

    const formattedMonthInitial = (thisMonth + 1).toString().padStart(2, '0');
    const formattedDayInitial = DATE.getDate().toString().padStart(2, '0');
    picked.innerHTML = `${year}-${formattedMonthInitial}-${formattedDayInitial}`;

    const createCalendar = () => {
      month.innerHTML = `${MONTHS[thisMonth]}, ${year}`;

      const dayOne = new Date(year, thisMonth).getDay();
      const monthDays = 32 - new Date(year, thisMonth, 32).getDate();

      let date = 1;
      for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          let column = document.createElement("td");
          if (date > monthDays) break;
          else if (i === 0 && j < dayOne) {
            let columnText = document.createTextNode("");
            column.appendChild(columnText);
            row.appendChild(column);
          } else {
            let columnText = document.createTextNode(date);
            column.appendChild(columnText);

            if(date === DATE.getDate() && thisMonth === DATE.getMonth() && year === DATE.getFullYear()){
              column.classList.add("today")
            }

            column.onclick = async () => {
                const formattedMonth = (thisMonth + 1).toString().padStart(2, '0');
                const formattedDay = column.textContent.padStart(2, '0');
                const datum = `${year}-${formattedMonth}-${formattedDay}`;
                picked.innerHTML = datum;
                console.log(datum);
                
                // Aufrufen der init-Funktion mit dem generierten Datum
                closePopup();
                await init(datum);
              }

            row.appendChild(column);
            date++;
          }
        }
        calendar.appendChild(row);
      }
    };

    createCalendar();

    const nextMonth = () => {
      thisMonth = thisMonth + 1;
      calendar.innerHTML = "";

      if(thisMonth > 11){
        year = year + 1;
        thisMonth = 0;
      }
      createCalendar();
      return thisMonth;
    };

    const prevMonth = () => {
      thisMonth = thisMonth - 1;
      calendar.innerHTML = "";

      if(thisMonth < 0){
        year = year - 1;
        thisMonth = 11;
      }
      createCalendar();
      return thisMonth;
    };
