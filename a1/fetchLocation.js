async function fetchLocation(search) {
    try {
            //https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const resultsArray = data.results;

        if (resultsArray && Array.isArray(resultsArray)) {
            resultsArray.forEach(element => {
                console.log(element);
            });
        } else {
            console.log("No results found or results is not an array.");
        }
    }
    catch (error) {
        console.log("Error fetching data: ", error);
    }

}

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