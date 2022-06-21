var searchFormEl = document.querySelector("#search-form");
var pastButtonsEl = document.querySelector("#past-buttons");
var cityInputEl = document.querySelector("#city-input");
var weatherContainerEl = document.querySelector("#weather-container");
var forecastBoxEl = document.querySelectorAll("#forecast-box");
var cityEl = document.querySelector(".city");
var tempEl = document.querySelector(".temp");
var windEl = document.querySelector(".wind");
var humidEl = document.querySelector(".humid");
var uviEl = document.querySelector(".uvi");

var pastCityList = [];

var searchHandler = function(event) {
    event.preventDefault();
  
    // get value from input element
    var city = cityInputEl.value.trim();
  
    if (city) {
      getWeather(city);
      addPast();
      // clear old content
      weatherContainerEl.textContent = "";
      cityInputEl.value = "";
    } else {
      alert("Please enter a valid city");
    }
};

var buttonClickHandler = function(event) {
    event.preventDefault();
    var pastCity = event.target.getAttribute("data-city");
  
    if (pastCity) {
      getWeather(pastCity);
      weatherContainerEl.textContent = "";
    }
};

var getWeather = function(city) {
    var apiKey = "e1f268c1ede4df1986c9534c143d8295";
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
  
    // make a get request to url
    fetch(weatherUrl)
        .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getforecast(lat, lon);
          });
        } else {
            alert('Error: City Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect");
        });
};

var getforecast = (lat, lon)=> {
    var apiKey = "e1f268c1ede4df1986c9534c143d8295";
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutes&exclude=alerts&appid=${apiKey}&units=imperial`;

    fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            showWeather(data);
            showForecast(data);
    })
}

var showWeather = function(weather_data) {
    var weatherSpanEl = document.createElement("span")
    var iconUrl = `https://openweathermap.org/img/w/${weather_data.daily[0].weather[0].icon}.png`;
    iconEl.setAttribute("src", iconUrl);
    weatherSpanEl.innerHTML = `Temperature: ${weather_data.current.temp}°F\rWind Speed: ${weather_data.current.wind_speed}\rHumidity: ${weather_data.current.humidity}\r UV Index:`;
    tempEl.innerHTML = `Temperature: ${weather_data.current.temp}°F`;
    windEl.innerHTML = `Wind Speed: ${weather_data.current.wind_speed}`;
    humidEl.innerHTML = `Humidity: ${weather_data.current.humidity}`;
    uviEl.textContent = "UV Index: ";
}

var showForecast = (future_data)=>{
    for (i = 0; i < forecastBoxEl.length; i++) {
        var j = i + 1;
        // Create elements to append to forecase divs
        var tempEl = document.createElement("p");
        var windEl = document.createElement("p");
        var humidEl = document.createElement("p");
        var iconEl = document.createElement("img");
        var iconUrl = `https://openweathermap.org/img/w/${future_data.daily[z].weather[0].icon}.png`;
        forecastBoxEl[i].innerHTML = "";
        
        tempEl.innerHTML = `Temperature: ${future_data.daily[z].temp.day}°F`;
        windEl.innerHTML = `Wind Speed: ${future_data.daily[z].wind_speed}`;
        humidEl.innerHTML = `Humidity: ${future_data.daily[z].humidity}`;
        iconEl.setAttribute("src", iconUrl);
        forecastBoxEl[i].setAttribute("class", "weather-card");
        forecastBoxEl[i].appendChild(dateEl);
        forecastBoxEl[i].appendChild(iconEl);
        forecastBoxEl[i].appendChild(tempEl);
        forecastBoxEl[i].appendChild(windEl);
        forecastBoxEl[i].appendChild(humidEl);
    }  
}

// add event listeners to form and button container
searchFormEl.addEventListener("submit", searchHandler);
pastButtonsEl.addEventListener("click", buttonClickHandler);
clearHistoryBtn.addEventListener("click", function(){
    var child = listCityEl.lastElementChild;
    while (child) {
        listCityEl.removeChild(child);
        child = listCityEl.lastElementChild;
    }
    localStorage.removeItem("cities");
});