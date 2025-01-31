const locationData = JSON.parse(sessionStorage.getItem('selectedLocation'));

const locationName = document.getElementById('location-name');
const countryName = document.getElementById('country-name');
const currentTemp = document.getElementById('current-temp');
const maxTemp = document.getElementById('max-temp');
const minTemp = document.getElementById('min-temp');
const windspeed = document.getElementById('windspeed');

console.log(locationData);
fetchWeather(locationData.longitude, locationData.latitude)
    .then(result => {
        console.log(result);
        locationName.innerText = locationData.locName;
        countryName.innerText = locationData.country;
    })
    .catch(err => console.error(err));

async function fetchWeather(longitude, latitude) {
    try {
        //example: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

        if (!longitude || !latitude) {
            throw new Error("Invalid Longitude or Latitude");
        }
        
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const weatherJson = await response.json();
        console.log(weatherJson);
        
    }
    catch (error) {
        console.error("Error fetching data: ", error);
    }
}