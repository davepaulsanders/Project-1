const modalClose = document.querySelector(".modal-close");
const modalOpen = document.querySelector(".modal-open");
const form = document.querySelector(".travel-form");
const modalContainer = document.querySelector(".modal");
const modal = document.querySelector(".modal-content");
const cityInput = document.querySelector(".city-text");
const startDate = document.querySelector(".start-date");
const endDate = document.querySelector(".end-date");
const cityError = document.querySelector(".city-error");
const startError = document.querySelector(".start-error");
const endError = document.querySelector(".end-error");
const cityName = document.querySelector(".city-name");

const weatherKey = "c3092c2d4eb3d6f6f64456f5fc464ffa";
// creating an array of all the datepickers in DOM
const datePickers = Array.from(document.querySelectorAll(".date"));

// finding local date

function dateToString(date) {
  let year = date.year;
  let month = date.month.toString();
  let day = date.day.toString();
  // padding day and month if necessary for final string
  if (day.length === 1) {
    day = day.padStart(2, "0");
  }
  if (month.length === 1) {
    month = month.padStart(2, "0");
  }
  const minDate = `${year}-${month}-${day}`;
  return minDate;
}
function datePickerSetUp() {
  const minDate = dateToString(luxon.DateTime.now().toObject());

  // setting min attribute of datepickers to disable dates in the past
  datePickers.forEach((date) => {
    date.setAttribute("min", minDate);
  });
}
function getCoords(city, start, end) {
  const queryCity = city;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${weatherKey}&units=imperial`
  )
    .then((response) => {
      if (response.ok === false) {
        cityInput.classList.add("is-danger");
        cityError.textContent = "Not a city!";
        throw Error("Not a city!");
      } else {
        response.json().then((data) => {
          modalContainer.classList.remove("is-active");
          console.log(data.name, data.coord.lat, data.coord.lon);
          cityName.textContent = data.name;
          cityNameDisplay(data.name);
          getEvents(data.coord.lat, data.coord.lon, start, end);
          listBreweries(city);
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function handleSubmit() {
  const city = cityInput.value.trim().toLowerCase();
  let start = luxon.DateTime.fromFormat(startDate.value, "yyyy-MM-dd");
  let end = luxon.DateTime.fromFormat(endDate.value, "yyyy-MM-dd");

  // if no text in city
  if (!city) {
    cityInput.classList.add("is-danger");
    cityError.textContent = "Choose a city!";
  }
  if (!startDate.value) {
    startDate.classList.add("is-danger");
    startError.textContent = "Choose a start date!";
  }
  if (!endDate.value) {
    endDate.classList.add("is-danger");
    endError.textContent = "Choose an end date!";
  }

  if (!city || !startDate.value || !endDate.value) {
    modal.classList.add("shake");
    var shakeRemove = setTimeout(() => {
      modal.classList.remove("shake");
    }, 1000);
  }

  // if all fields are filled
  if (city && startDate.value && endDate.value) {
    // if the end date is before the start date
    if (start > end) {
      startDate.classList.add("is-danger");
      startError.textContent = "Start date must be after end date!";
      endDate.classList.add("is-danger");
      endError.textContent = "End date must be before start date!";
      return;
    }
    // convert start and end objects to strings
    start = dateToString(start);
    end = dateToString(end);

    // clear timeout
    clearTimeout(shakeRemove);
    // send to fetch functions
    getCoords(city, start, end);
  }
}

// submit listener for form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit();
});

// If elements have errors and are focused again the error is hidden
cityInput.addEventListener("focus", () => {
  const cityStorage = JSON.parse(localStorage.getItem("cities"));
  const dataList = document.querySelector(".storage");
  // emptying datalist if previously generated
  dataList.innerHTML = "";
  // Adding local storage cities to datalist on focus
  cityStorage.forEach((city) => {
    const cityEl = document.createElement("option");
    cityEl.textContent = city;
    dataList.appendChild(cityEl);
  });

  if (cityInput.classList.contains("is-danger")) {
    cityError.textContent = "";
    cityInput.classList.remove("is-danger");
  }
});
startDate.addEventListener("focus", () => {
  if (startDate.classList.contains("is-danger")) {
    startDate.classList.remove("is-danger");
    startError.textContent = "";
  }
});
endDate.addEventListener("focus", () => {
  if (endDate.classList.contains("is-danger")) {
    endDate.classList.remove("is-danger");
    endError.textContent = "";
  }
});
modalClose.addEventListener("click", () => {
  modalContainer.classList.remove("is-active");
});

modalOpen.addEventListener("click", () => {
  cityInput.value = "";
  modalContainer.classList.add("is-active");
});

// creating local storage for cities entered into app
function cityNameDisplay(city) {
  const cityStorage = JSON.parse(localStorage.getItem("cities"));
  // create a storage array if it's empty
  if (!cityStorage) {
    const cityArr = [];
    cityArr.push(city);
    localStorage.setItem("cities", JSON.stringify(cityArr));
  } else {
    if (cityStorage.includes(city)) {
      // if the city is already in local storage
      return;
    } else {
      cityStorage.push(city);
      localStorage.setItem("cities", JSON.stringify(cityStorage));
    }
  }
}
// Adding New York to local storage when the modal loads
cityNameDisplay("New York");
datePickerSetUp();
