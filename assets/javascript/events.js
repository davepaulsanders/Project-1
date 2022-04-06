const eventList = document.querySelector(".event-list");
const eventTitle = document.querySelector(".event-title");
function getEvents(lat, lon, start, end) {
  fetch(
    `https://api.seatgeek.com/2/events/?lat=${lat}&lon=${lon}&per_page=5&range=15mi&datetime_utc.gt=${start}&datetime_utc.lte=${end}&client_id=MjYyNjc0MTB8MTY0ODIyNDk1OC43MDc4MTk3`
  )
    .then((response) => {
      response.json().then((data) => {
        const events = data.events;

        if (events.length === 0) {
          const eventWarning = document.createElement("h3");
          eventWarning.textContent = "Sorry, no events in that city!";
          eventList.appendChild(eventWarning);
          return;
        }
        eventList.innerHTML = "";
        events.forEach((e) => {
          // creating date object and converting it to readable format
          let date = luxon.DateTime.fromISO(e.datetime_local).toLocaleString(
            luxon.DateTime.DATETIME_MED
          );
          const eventItem = document.createElement("li");
          const eventLink = document.createElement("a");
          const eventImage = document.createElement("img");
          eventLink.setAttribute("href", e.url);
          eventImage.setAttribute("src", e.performers[0].images.huge);
          eventLink.setAttribute("class", "results");
          eventItem.textContent = `${e.title}- ${date}`;
          eventLink.appendChild(eventItem);
          eventLink.appendChild(eventImage);
          eventList.appendChild(eventLink);
        });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// Adding events for NY in case modal is closed without making
// a selection

getEvents(40.7143, -74.006, "2022-04-06", "2022-04-07");
