function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-city");
  let descriptionElement = document.querySelector("#weather-description");
  let tempElement = document.querySelector("#weather-humidity");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  timeElement.innerHTML = formatDate(date);
  tempElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  speedElement.innerHTML = `${response.data.wind.speed} mph`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b186a53540a66b93c63e67af40o0ct1c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchEngine(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchEngine);

function getForecast(city) {
  let apiKey = "b186a53540a66b93c63e67af40o0ct1c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);

  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="forecast-days">
    <div class="forecast-day">${formatDay(day.time)}</div>
    <div class="forecast-day-icon"> <img src="${
      day.condition.icon_url
    }" class="forecast-day-icon" /></div>
    <div class="forecast-day-temp">
      <div class="forecast-day-temperatures">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="forecast-day-temperatures">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>
  `;
    }
  });
  let forecastElement = document.querySelector("#forecasts");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Cape Town");
