const eventList = document.querySelector(".event-list");

function getEvents(lat, lon, start, end) {
  console.log(lat, lon, start, end);
  lat = lat.toString();
  lon = lon.toString();
  fetch(
    `https://api.seatgeek.com/2/events/?lat=${lat}&lon=${lon}&per_page=5&range=15mi&datetime_utc.gt=${start}&datetime_utc.lte=${end}&client_id=MjYyNjc0MTB8MTY0ODIyNDk1OC43MDc4MTk3`
  )
    .then((response) => {
      if (response.ok === false) {
        console.log("nothing here");
      } else {
        response.json().then((data) => {
          const events = data.events;
          console.log(events);
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
            eventLink.setAttribute("class", "event-block");
            eventItem.textContent = `${e.title}- ${date}`;
            eventLink.appendChild(eventItem);
            eventLink.appendChild(eventImage);
            eventList.appendChild(eventLink);
          });
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

("2022-04-01T14:00:00");
