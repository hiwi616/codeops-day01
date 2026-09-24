// app.js
//
// Ethiopia Weather Explorer - fetches live weather data for a chosen
// Ethiopian city from the free Open-Meteo API and renders it into
// the DOM. No framework, no API key required.

// ---- Cache element references once -----------------------------------
const citySelect = document.querySelector("#city-select");
const statusEl = document.querySelector("#status");
const currentCard = document.querySelector("#current-card");
const currentCityName = document.querySelector("#current-city-name");
const currentDescription = document.querySelector("#current-description");
const currentIcon = document.querySelector("#current-icon");
const currentTemp = document.querySelector("#current-temp");
const currentWind = document.querySelector("#current-wind");
const forecastSection = document.querySelector("#forecast-section");
const forecastGrid = document.querySelector("#forecast-grid");

// Coordinates for each city - hardcoded since these don't change,
// avoiding an extra geocoding API round trip.
const CITIES = {
  "addis-ababa": { name: "Addis Ababa", lat: 9.03, lon: 38.74 },
  "bahir-dar": { name: "Bahir Dar", lat: 11.6, lon: 37.39 },
  hawassa: { name: "Hawassa", lat: 7.05, lon: 38.48 },
  mekelle: { name: "Mekelle", lat: 13.5, lon: 39.47 },
  gondar: { name: "Gondar", lat: 12.6, lon: 37.47 },
  "dire-dawa": { name: "Dire Dawa", lat: 9.6, lon: 41.87 },
  jimma: { name: "Jimma", lat: 7.67, lon: 36.83 },
  adama: { name: "Adama", lat: 8.54, lon: 39.27 },
};

// Open-Meteo "weather codes" mapped to a short description and emoji.
// https://open-meteo.com/en/docs (WMO weather interpretation codes)
const WEATHER_CODES = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mostly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Heavy drizzle", icon: "🌧️" },
  61: { label: "Light rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  80: { label: "Rain showers", icon: "🌦️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

function describeWeatherCode(code) {
  return WEATHER_CODES[code] || { label: "Unknown", icon: "❓" };
}

// ---- UI state helpers ---------------------------------------------------

function showLoading() {
  statusEl.className = "text-center text-sm mb-4 min-h-[1.25rem] text-slate-500 italic";
  statusEl.textContent = "Loading weather...";
  currentCard.classList.add("hidden");
  forecastSection.classList.add("hidden");
}

function showError(message) {
  statusEl.className = "text-center text-sm mb-4 min-h-[1.25rem] text-red-600";
  statusEl.textContent = message;
  currentCard.classList.add("hidden");
  forecastSection.classList.add("hidden");
}

function clearStatus() {
  statusEl.textContent = "";
}

// ---- Formatting helpers --------------------------------------------------

function formatDayLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

// ---- Rendering (createElement, no innerHTML string building) -----------

function renderCurrent(cityName, weather) {
  const { label, icon } = describeWeatherCode(weather.weathercode);

  currentCityName.textContent = cityName;
  currentDescription.textContent = label;
  currentIcon.textContent = icon;
  currentTemp.textContent = Math.round(weather.temperature);
  currentWind.textContent = `Wind: ${Math.round(weather.windspeed)} km/h`;

  currentCard.classList.remove("hidden");
}

function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function renderForecast(daily) {
  clearElement(forecastGrid);

  const days = daily.time.slice(0, 5);

  days.forEach((dateString, index) => {
    const max = Math.round(daily.temperature_2m_max[index]);
    const min = Math.round(daily.temperature_2m_min[index]);
    const { icon } = describeWeatherCode(daily.weathercode[index]);

    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-sm p-2 text-center";

    const dayLabel = document.createElement("p");
    dayLabel.className = "text-xs font-medium text-slate-500";
    dayLabel.textContent = formatDayLabel(dateString);

    const iconEl = document.createElement("p");
    iconEl.className = "text-2xl my-1";
    iconEl.textContent = icon;

    const tempsEl = document.createElement("p");
    tempsEl.className = "text-xs text-slate-700";
    tempsEl.textContent = `${max}° / ${min}°`;

    card.append(dayLabel, iconEl, tempsEl);
    forecastGrid.append(card);
  });

  forecastSection.classList.remove("hidden");
}

// ---- Fetching -------------------------------------------------------------

async function fetchWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}

async function loadCity(cityKey) {
  const city = CITIES[cityKey];
  if (!city) return;

  showLoading();

  try {
    const data = await fetchWeather(city.lat, city.lon);
    clearStatus();
    renderCurrent(city.name, data.current_weather);
    renderForecast(data.daily);
  } catch (err) {
    showError(`Could not load weather for ${city.name}: ${err.message}`);
  }
}

// ---- Events -----------------------------------------------------------------

citySelect.addEventListener("change", () => {
  loadCity(citySelect.value);
});

// ---- Default to Addis Ababa on first load -------------------------------
citySelect.value = "addis-ababa";
loadCity("addis-ababa");
