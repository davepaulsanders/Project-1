function getEvents(lat, lon, start, end) {
  console.log(lat, lon, start, end);
  lat = lat.toString();
  lon = lon.toString();
  fetch(
    `https://api.seatgeek.com/2/events/?lat=${lat}&lon=${lon}&range=15mi&datetime_utc.gt=${start}&datetime_utc.lte=${end}&client_id=MjYyNjc0MTB8MTY0ODIyNDk1OC43MDc4MTk3`
  )
    .then((response) => {
      if (response.ok === false) {
        console.log("nothing here");
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
