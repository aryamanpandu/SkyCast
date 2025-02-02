const noOfFavourites = document.getElementById('No-of-Favourites');
const favouriteTable = document.getElementById('favourite-table');
const favouriteTableBody = document.getElementById('favourite-table-body');


function displayFavouriteCities() {
    const favouriteCities = JSON.parse(sessionStorage.getItem('favouriteCities'));
    console.log(favouriteCities);
    if (!favouriteCities || favouriteCities.length === 0) {
        noOfFavourites.innerText = "You have no favourite cities yet!"; 
    }
    else {
        noOfFavourites.innerText = `You have ${favouriteCities.length} favourite(s)!`;

        favouriteCities.forEach(element => {
            const favouriteTableBody = document.getElementById('favourite-table-body');
            const tableRow = document.createElement('tr');
            const locNameDataCell = document.createElement('td');
            const locCountryDataCell = document.createElement('td');
            const stateNameDataCell = document.createElement('td');
            const timezoneDataCell = document.createElement('td');
            const populationDataCell = document.createElement('td');
            
        
            locNameDataCell.innerText = element.locName;
            stateNameDataCell.innerText = element.state;
            locCountryDataCell.innerText = element.country;
            timezoneDataCell.innerText = element.timezone;
            populationDataCell.innerText = element.population;
        
            tableRow.appendChild(locNameDataCell);
            tableRow.appendChild(stateNameDataCell);
            tableRow.appendChild(locCountryDataCell);
            tableRow.appendChild(timezoneDataCell);
            tableRow.appendChild(populationDataCell);
            favouriteTableBody.appendChild(tableRow);   
        
        
            tableRow.addEventListener('click', () => {
                const locationData = {
                    longitude: element.longitude,
                    latitude: element.latitude,
                    locName: element.locName,
                    state: element.admin1, 
                    country: element.country,
                    population: element.population,
                    timezone: element.timezone
                };
                sessionStorage.setItem('selectedLocation', JSON.stringify(locationData));
                window.location.href = 'Card.html';
            });
        });
    }
}


displayFavouriteCities();

function addElementTable(resultData) {
    const resultBody = document.getElementById('result-body');
    const tableRow = document.createElement('tr');
    const locNameDataCell = document.createElement('td');
    const stateNameDataCell = document.createElement('td');
    const locCountryDataCell = document.createElement('td');
    const timezoneDataCell = document.createElement('td');
    const populationDataCell = document.createElement('td');
    

    locNameDataCell.innerText = resultData.name;
    if (resultData.hasOwnProperty('admin1')) {
        stateNameDataCell.innerText = resultData.admin1
    } else {
        stateNameDataCell.innerText = 'Unknown';
    }
    locCountryDataCell.innerText = resultData.country;
    timezoneDataCell.innerText = resultData.timezone;
    populationDataCell.innerText = resultData.population;

    tableRow.appendChild(locNameDataCell);
    tableRow.appendChild(stateNameDataCell);
    tableRow.appendChild(locCountryDataCell);
    tableRow.appendChild(timezoneDataCell);
    tableRow.appendChild(populationDataCell);
    resultBody.appendChild(tableRow);   


    tableRow.addEventListener('click', () => {
        const locationData = {
            longitude: resultData.longitude,
            latitude: resultData.latitude,
            locName: resultData.name,
            country: resultData.country
        };
    
        sessionStorage.setItem('selectedLocation', JSON.stringify(locationData));
        window.location.href = 'Card.html';
    });
}
