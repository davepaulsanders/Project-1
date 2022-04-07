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
          eventList.innerHTML = "";
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

          // creating link to hold event
          const eventLink = document.createElement("a");
          eventLink.setAttribute("href", e.url);
          eventLink.setAttribute("class", "results");

          // setting inside of links
          eventLink.innerHTML = `
            <li>
            <p class=" event-name my-3 border-1">${e.title}</p>
            <p class="is-size-7">${date}</p>
            </li>
            <img src=${e.performers[0].images.huge} alt='event image'/>
            `;

          // appending to ul in html
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

window.addEventListener("load", () => {
  const today = luxon.DateTime.now().toISO().split("T")[0];
  const tomorrow = luxon.DateTime.now().plus({ days: 1 }).toISO().split("T")[0];
  getEvents(40.7143, -74.006, today, tomorrow);
});
