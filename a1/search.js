const searchParams = new URLSearchParams(window.location.search);
const noOfResults = document.getElementById('No-of-Results');

const searchLoc = searchParams.get('search-loc');

fetchLocation(searchLoc)
  .then((result) => {
    if (Array.isArray(result)) {
      if (result.length > 0) {
        noOfResults.innerText = `${searchLoc} has ${result.length} results`;
        
        result.forEach((elem) => {
            addElementTable(elem);
        });
      } else {
        noOfResults.innerText = 'No results found';
      }
    } else {
        noOfResults.innerText = 'No results found';
        console.error("Expected an array but got:", result);
    }
  })
  .catch((err) => console.error(err));

//This function adds an element to the table so that we can 
//

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

    console.log(resultData);

    tableRow.addEventListener('click', () => {
        const locationData = {
            longitude: resultData.longitude,
            latitude: resultData.latitude,
            locName: resultData.name,
            state: resultData.admin1, 
            country: resultData.country,
            population: resultData.population,
            timezone: resultData.timezone
        };
    
        sessionStorage.setItem('selectedLocation', JSON.stringify(locationData));
        window.location.href = 'Card.html';
    });
}

async function fetchLocation(search) {
    try {   
        if (search !== "") {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const resultsArray = data.results;

            if (resultsArray && Array.isArray(resultsArray)) {
                return resultsArray;

            } else {
                console.log("No results found or results is not an array.");
            }   
        }
        else {
            console.log("No results found");
        }
    }
    catch (error) {
        console.log("Error fetching data: ", error);
    }
}