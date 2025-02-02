const locationData = JSON.parse(sessionStorage.getItem('selectedLocation'));
console.log(locationData);
const locationName = document.getElementById('location-name');
const countryName = document.getElementById('country-name');
const currentTemp = document.getElementById('current-temp');
const maxTemp = document.getElementById('max-temp');
const minTemp = document.getElementById('min-temp');
const windspeed = document.getElementById('windspeed');

const star = document.getElementById('star-shape');

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];

//So instead of toggling
// Think about it as storing whether the star will be lit up or not
function toggleFavourite() {
    if (!star.hasAttribute('style') || !star.style.fill) {
        star.style.fill = '#ED8A19';
        addToFavourite(locationData);
    }
    else {
        star.style.fill = '';
        removeFromFavourite(locationData);
    }
}


//This funciton can be used to show the status in the star
function showFavouriteStatus(locationData) {
    let data = JSON.parse(sessionStorage.getItem('favouriteCities')) || [];
    console.log(data);
    console.log(locationData);

    if (data.length === 0) {
        star.style.fill = '';
        return;
    }
    const idx = data.findIndex(data => data.longitude === locationData.longitude && data.latitude === locationData.latitude);
    if (idx > -1) {
        star.style.fill = '#ED8A19';
    }
    else {
        star.style.fill = '';
    }
}   

//When I click on the favourites button, I can add the city to my favourites. 
// This will add that city into favourites
//Consider facouriteCities as an array of the objects.
// if favouriteCities is empty then store an empty array in favourite cities and then push 
// 
function addToFavourite(locationData) {
    let cityArr;
    if (!sessionStorage.getItem('favouriteCities')) {
        cityArr = [];
        cityArr.push(locationData);
        sessionStorage.setItem('favouriteCities', JSON.stringify(cityArr));
    }
    else {
        cityArr = JSON.parse(sessionStorage.getItem('favouriteCities'));
        cityArr.push(locationData);
        sessionStorage.setItem('favouriteCities', JSON.stringify(cityArr));
    }

    console.log(cityArr);
}

function removeFromFavourite(locationData) {
    let cityArr = JSON.parse(sessionStorage.getItem('favouriteCities'));

    if (!cityArr) {
        return;
    }

    cityArr = cityArr.filter(city => city.longitude !== locationData.longitude && city.latitude !== locationData.latitude);
    console.log(cityArr);
    sessionStorage.setItem('favouriteCities', JSON.stringify(cityArr));
}

function displayCurrentWeather(resultData) {
    const card = document.getElementById('current-weather-card');
    const cardTitle = document.getElementById('current-weather-card-title');
    const cardBody = document.getElementById('current-weather-body');

    const currentWeatherData = resultData.current;

    const currDateTime = new Date(`${currentWeatherData.time}`);

    const extraInfo = resultData.daily;
    
    cardTitle.insertAdjacentHTML('beforeend', ` ${locationData.locName}, ${locationData.country}`);
    const info = ` <div class = ''>Current Temp: ${currentWeatherData.temperature_2m} °C</div>
                    <div class = ''>Date: ${currDateTime.getUTCDate()} ${month[currDateTime.getUTCMonth()]} ${currDateTime.getUTCFullYear()}</div>
                    <div class = ''>Max Temp: ${extraInfo.temperature_2m_max[0]} °C</div>
                    <div class = ''>Min Temp: ${extraInfo.temperature_2m_min[0]} °C</div>
                    <div class = ''>Windspeed: ${currentWeatherData.wind_speed_10m} km/h</div>
                    <div class = ''>Precipitaion: ${currentWeatherData.precipitation} mm</div>
                `;

    cardBody.innerHTML = info;
}

function display7dayForecast(dailyData) {
    const container = document.getElementById("weather-container");
    container.innerHTML = '';
    
    for (let i = 0; i < dailyData.time.length; i++) {
        // Ensure the date is treated as UTC
        const currDate = new Date(`${dailyData.time[i]}T00:00:00Z`);
        const currSunrise = new Date(`${dailyData.sunrise[i]}Z`);
        const currSunset = new Date(`${dailyData.sunset[i]}Z`);
    
        const card = `
        <div class="col-lg-3 col-md-4 col-sm-6 d-flex my-3">
            <div class="card rounded flex-fill">
                <div class="card-body">
                    <h5 class="card-title">Date: ${currDate.getUTCDate()} ${month[currDate.getUTCMonth()]} ${currDate.getUTCFullYear()}</h5>
                    <p class="card-text">🌡 Max Temp: ${dailyData.temperature_2m_max[i]}°C</p>
                    <p class="card-text">❄ Min Temp: ${dailyData.temperature_2m_min[i]}°C</p>
                    <p class="card-text">🌅 Sunrise: ${currSunrise.getUTCHours()}:${currSunrise.getUTCMinutes()} UTC</p>
                    <p class="card-text">🌇 Sunset: ${currSunset.getUTCHours()}:${currSunset.getUTCMinutes()} UTC</p>
                    <p class="card-text">💨 Wind: ${dailyData.wind_speed_10m_max[i]} km/h</p>
                    <p class="card-text">🌧️ Rain Probability: ${dailyData.precipitation_probability_max[i]}%</p>
                </div>
            </div>
        </div>`;
        container.innerHTML += card;
    }
}

async function fetchWeather(longitude, latitude) {
    try {
        //example: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

        if (!longitude || !latitude) {
            throw new Error("Invalid Longitude or Latitude");
        }
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&minutely_15=&hourly=&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max`);
        // const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max`);
        // current=temperature_2m,relative_humidity_2m,precipitation&minutely_15=&hourly=&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const weatherJson = await response.json(); 

        return weatherJson;
    }
    catch (error) {
        console.error("Error fetching data: ", error);
    }
}


fetchWeather(locationData.longitude, locationData.latitude)
    .then(result => {
        displayCurrentWeather(result);      
        display7dayForecast(result.daily);
    })
    .catch(err => console.error(err));


star.addEventListener('click',() => {
    toggleFavourite();
});

showFavouriteStatus(locationData);

