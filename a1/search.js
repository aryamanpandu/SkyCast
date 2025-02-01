const searchParams = new URLSearchParams(window.location.search);
const noOfResults = document.getElementById('No-of-Results');

const searchLoc = searchParams.get('search-loc');

fetchLocation(searchLoc)
  .then((result) => {
    if (Array.isArray(result)) {
      if (result.length > 0) {
        noOfResults.innerText = `${searchLoc} has ${result.length} results`;
        console.log(result);
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

// <tr>
// <td>Delhi (Name)</td>
// <td>India (country)</td>
// <td>Asia/Kolkata (timezone)</td>
// </tr>
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
        // fetchWeather(elem.longitude, elem.latitude)
        //     .then(result => console.log(result))
        //     .catch(err => console.error(err)); 
    });
}

async function fetchLocation(search) {
    try {
            //https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json

            
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


// async function fetchWeather(longitude, latitude) {
//     try {
//         //example: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m
//         if (longitude > 0 && longitude > 0) {
//             const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const weatherJson = await response.json();
//             console.log(weatherJson);
//         }
//         else {
//             console.log('Invalid longtidue/latitude values for the location.');
//         }
//     }
//     catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// }

// locations.forEach(elem => {
//     const listElem = document.createElement("li");
//     listElem.appendChild(locations.name);
//     searchList.appendChild(listElem);
// });


///Go through each item and put them in a href and list tag.

//How will I dynamically make a page for each item tho?

// good question.

 //JSON response
    // "results": [
    // {
    //   "id": 2950159,
    //   "name": "Berlin",
    //   "latitude": 52.52437,
    //   "longitude": 13.41053,
    //   "elevation": 74.0,
    //   "feature_code": "PPLC",
    //   "country_code": "DE",
    //   "admin1_id": 2950157,
    //   "admin2_id": 0,
    //   "admin3_id": 6547383,
    //   "admin4_id": 6547539,
    //   "timezone": "Europe/Berlin",
    //   "population": 3426354,
    //   "postcodes": [
    //     "10967",
    //     "13347"
    //   ],
    //   "country_id": 2921044,
    //   "country": "Deutschland",
    //   "admin1": "Berlin",
    //   "admin2": "",
    //   "admin3": "Berlin, Stadt",
    //   "admin4": "Berlin"
    // },
    // {
    //   ...
    // }]