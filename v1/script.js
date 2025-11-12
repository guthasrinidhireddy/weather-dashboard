const currentWeatherDiv = document.querySelector(".current-weather");
const API_KEY = "0d797d83334aeee8a7fc62d56670c137";
const FIXED_CITY = "London";

const createWeatherCard = (cityName, weatherItem) => {
  const tempC = (weatherItem.main.temp - 273.15).toFixed(2);
  return `
    <div class="weather-card current">
      <h2>${cityName}</h2>
      <img src="<https://openweathermap.org/img/wn/${weatherItem.weather>[0].icon}@2x.png" alt="weather-icon" />
      <p>${weatherItem.weather[0].description}</p>
      <p>Temp: ${tempC}°C</p>
      <p>Wind: ${weatherItem.wind.speed} M/S</p>
      <p>Humidity: ${weatherItem.main.humidity}%</p>
    </div>
  `;
};

const getWeatherDetails = (cityName) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        currentWeatherDiv.innerHTML = `<p>City not found!</p>`;
        return;
      }
      currentWeatherDiv.innerHTML = createWeatherCard(cityName, data);
    })
    .catch(() => {
      currentWeatherDiv.innerHTML = `<p>Error fetching data!</p>`;
    });
};

// Call on page load for the fixed city
getWeatherDetails(FIXED_CITY);
