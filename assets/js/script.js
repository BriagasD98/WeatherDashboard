/* PSEUDOCODE>>>
    > Define variables
    > Make fetch requests to APIs
    > Assign query selectors
    > Create callback functions
    > Create event listeners
*/

// Api Key
var apiKey = "3c5fedbc6d20b5cf5be7e03e1022c6ba";

// Third-Party APIs for fetch requests
var weatherGeo = "https://api.openweathermap.org/geo/1.0/direct?q="
var oneCallWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=";

// Query selectors for city search box
var formEl = document.querySelector('#city-form');
var pastEl = document.querySelector('#past-searches');
var previousCities = [];

//Query selectors for current weather
var currentEl = document.querySelector("#currentWeather");
var cityName = document.querySelector("#cityName");
var weatherText = document.querySelector("#weatherText");
var iconEl = document.querySelector("#icon");

// Current Weather card
var loadCities = function(){
    var savedCities = localStorage.getItem("cities");

    if (!savedCities) {
        savedCities=[];
        return false;
    };

    savedCities=JSON.parse(savedCities);

    for(x=0;x<savedCities.length;x++){
        addPast(savedCities[x]);
    }; 
};

// Saves searches to local storage
var saveCities = function(cities){
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
}

var searchButton = document.querySelector('#searchBtn');
var searchCities = document.querySelector('#city-input');

var handleResponse = function(data) {
    // displays current weather information in main content card
    currentDate.textContent = new Date(data.current.dt * 1000).toLocaleDateString('en-US');
    currentTemp.textContent = 'Temp: ' + data.current.temp + '°F';
    currentWind.textContent = 'Wind: ' + data.current.wind_speed + ' mph';
    currentHumidity.textContent = 'Humidity: ' + data.current.humidity + '%';
    currentUV.textContent = 'UV: ' + data.current.uvi;

    for(i=0;i<5;i++){
        handle5Day(data.daily[i]);
    }
}

var handle5Day = function(data) {
    console.log(data)
}

// function to get lon/lat for location based weather data
var getWeather = function(e) {
    var city = searchCities.value
    e.preventDefault();
    console.log(city);

    fetch(weatherGeo + city + '&appid=' + apiKey)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var lat = data[0].lat
        var lon = data[0].lon
        cityName.textContent = data[0].name

        fetch(oneCallWeather + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            handleResponse(data);
        });
    }
        );
}

searchButton.addEventListener('click', function(e) {
    getWeather(e);
})

