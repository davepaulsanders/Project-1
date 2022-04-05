const breweryList = document.querySelector(".brewery-list");
const breweryName = document.querySelector(".brewery-name");
        async function listBreweries(city) {
            try {
                const response = await fetch(`https://api.openbrewerydb.org/breweries?by_city=${encodeURIComponent(city)}`);
                const breweries = await response.json()
                console.table(breweries);
                if (breweries.length === 0) {
                    const breweryWarning = document.createElement('h3');
                    breweryWarning.textContent = 'Sorry, no breweries in that city!';
                    breweriesList.appendChild(breweryWarning);
                    return;
                }
                breweries.forEach(brewery => {
                    const breweryLink = document.createElement('a');
                    breweryLink.setAttribute('href', brewery.website_url);
                    breweryLink.setAttribute('class', 'event-block');
                    breweryLink.textContent = brewery.name;
                    const breweryItem = document.createElement('li');
                    breweryItem.appendChild(breweryLink);
                    breweryList.appendChild(breweryItem);
                });
            } catch (error) {
                console.error(error);
            };
        }
        