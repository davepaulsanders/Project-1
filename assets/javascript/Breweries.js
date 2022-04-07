const breweryList = document.querySelector(".brewery-list");
const breweryName = document.querySelector(".brewery-name");
const breweryContainer = document.querySelector(".notification");
async function listBreweries(city) {
  try {
    const response = await fetch(
      `https://api.openbrewerydb.org/breweries?by_city=${city}`
    );
    const breweries = await response.json();

    if (breweries.length === 0) {
      const breweryWarning = document.createElement("h3");
      breweryWarning.textContent = "Sorry, no breweries in that city!";
      breweryList.appendChild(breweryWarning);
      return;
    }
    breweryList.innerHTML = "";
    breweries.forEach((brewery) => {
      const breweryLink = document.createElement("a");
      breweryLink.setAttribute("href", brewery.website_url);
      breweryLink.setAttribute("class", "results");
      breweryLink.textContent = brewery.name;
      const breweryItem = document.createElement("li");
      breweryItem.appendChild(breweryLink);
      breweryList.appendChild(breweryItem);
      breweryContainer.scrollTop = 0;
    });
  } catch (error) {
    console.error(error);
  }
}

// Loading breweries in background for NY in case
// modal is closed without making a selection
window.addEventListener("load", () => {
  listBreweries("New York");
});
