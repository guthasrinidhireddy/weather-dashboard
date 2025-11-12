const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const API_KEY = "0d797d83334aeee8a7fc62d56670c137";

const createWeatherCard = (cityName, weatherItem, isCurrent = false) => {
  // Kelvin to Celsius conversion
  const tempC = (weatherItem.main.temp - 273.15).toFixed(2);
  return `
    <div class="weather-card${isCurrent ? ' current' : ''}">
      <h2>${cityName} (${weatherItem.dt_txt ? weatherItem.dt_txt.split(" ")[0] : new Date().toLocaleDateString()})</h2>
      <img src="<https://openweathermap.org/img/wn/${weatherItem.weather>[0].icon}@2x.png" alt="weather-icon" />

      <p>${weatherItem.weather[0].description}</p>
      <p>Temp: ${tempC}°C</p>
      <p>Wind: ${weatherItem.wind.speed} M/S</p>
      <p>Humidity: ${weatherItem.main.humidity}%</p>
    </div>
  `;
};

const getWeatherDetails = (cityName) => {
  // Fetch 5-day forecast and current weather
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)

    .then(response => response.json())
    .then(data => {
      if (data.cod !== "200") {
        currentWeatherDiv.innerHTML = `<p>City not found!</p>`;
        weatherCardsDiv.innerHTML = "";
        return;
      }
      const uniqueDays = [];
      const fiveDayForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueDays.includes(forecastDate)) {
          uniqueDays.push(forecastDate);
          return true;
        }
        return false;
      });
      // Display current weather (first item)
      currentWeatherDiv.innerHTML = createWeatherCard(cityName, data.list[0], true);
      // Display five day forecast
      weatherCardsDiv.innerHTML = fiveDayForecast.map(forecast =>
        createWeatherCard(cityName, forecast)).join("");
    })
    .catch(() => {
      currentWeatherDiv.innerHTML = `<p>Error fetching data!</p>`;
      weatherCardsDiv.innerHTML = "";
    });
};

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeatherDetails(city);
});
