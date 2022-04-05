const breweryList = document.querySelector(".brewery-list");
const breweryName = document.querySelector(".brewery-name");
function getBrewery(name) {
  console.log(name);
  fetch(
    `https://api.openbrewerydb.org/breweries?by_name=${encodeURIComponent(name)}`)    
    
    .then((response) => {
      response.json().then((data) => {
        const brewery = data.brewery;
        console.log(data);

        if (data.length === 0) {
          const breweryWarning = document.createElement("h3");
          breweryWarning.textContent = "Sorry, no breweries in that city!";
          breweryList.appendChild(breweryWarning);
          return;
        }
        brewery.forEach((e) => {
          const breweryItem = document.createElement('li');
          const breweryLink = document.createElement('a');
          breweryLink.setAttribute('href', el.website_url);
          breweryLink.setAttribute('class', 'event-block');
          breweryItem.textContent = el.name;
          breweryLink.appendChild(breweryItem);
          breweryList.appendChild(breweryLink);
        });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
