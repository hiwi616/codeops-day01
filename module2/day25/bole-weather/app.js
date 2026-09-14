// ============================================================
// BOLE WEATHER - FINAL APP.JS
// Weather application for Ethiopian cities
// API: Open-Meteo
// ============================================================


// ============================================================
// 1. API CONFIGURATION
// ============================================================

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";


// ============================================================
// 2. MAJOR ETHIOPIAN CITIES
// ============================================================

const majorCities = [
    {
        name: "Addis Ababa",
        latitude: 9.03,
        longitude: 38.74
    },
    {
        name: "Dire Dawa",
        latitude: 9.60,
        longitude: 41.85
    },
    {
        name: "Bahir Dar",
        latitude: 11.57,
        longitude: 37.36
    },
    {
        name: "Hawassa",
        latitude: 7.06,
        longitude: 38.48
    },
    {
        name: "Mekelle",
        latitude: 13.50,
        longitude: 39.47
    },
    {
        name: "Gondar",
        latitude: 12.60,
        longitude: 37.47
    }
];


// ============================================================
// 3. APPLICATION STATE
// ============================================================

let currentCity = majorCities[0];
let currentWeatherData = null;

let temperatureUnit =
    localStorage.getItem("temperatureUnit") || "celsius";

let favoriteCities =
    JSON.parse(localStorage.getItem("favoriteCities")) || [];


// ============================================================
// 4. DOM ELEMENTS
// ============================================================

const citySearch = document.getElementById("city-search");
const searchButton =
    document.getElementById("search-button") ||
    document.getElementById("search-btn");

const searchResults = document.getElementById("search-results");

const cityName =
    document.getElementById("city-name");

const currentDate =
    document.getElementById("current-date") ||
    document.getElementById("date");

const temperature =
    document.getElementById("temperature");

const weatherCondition =
    document.getElementById("weather-condition") ||
    document.getElementById("condition");

const weatherIcon =
    document.getElementById("weather-icon");

const feelsLike =
    document.getElementById("feels-like");

const humidity =
    document.getElementById("humidity");

const wind =
    document.getElementById("wind-speed") ||
    document.getElementById("wind");

const pressure =
    document.getElementById("pressure");

const visibility =
    document.getElementById("visibility");

const rainChance =
    document.getElementById("rain-chance");

const sunrise =
    document.getElementById("sunrise");

const sunset =
    document.getElementById("sunset");

const hourlyForecast =
    document.getElementById("hourly-forecast");

const dailyForecast =
    document.getElementById("daily-forecast");

const favoritesList =
    document.getElementById("favorites-list") ||
    document.getElementById("favorites");

const majorCitiesList =
    document.getElementById("major-cities-list") ||
    document.getElementById("major-cities");

const weeklyReportContent =
    document.getElementById("weekly-report-content");

const alertsContainer =
    document.getElementById("alerts-container");

const favoriteButton =
    document.getElementById("favorite-button");

const sideFavoriteButton =
    document.getElementById("favorite-button-side");

const clearFavoritesButton =
    document.getElementById("clear-favorites");

const refreshButton =
    document.getElementById("refresh-weather");

const temperatureUnitSelect =
    document.getElementById("temperature-unit");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("error-message");


// ============================================================
// 5. WEATHER CODE INFORMATION
// ============================================================

function getWeatherInfo(code) {

    const weatherCodes = {

        0: {
            text: "Clear Sky",
            icon: "☀️"
        },

        1: {
            text: "Mainly Clear",
            icon: "🌤️"
        },

        2: {
            text: "Partly Cloudy",
            icon: "⛅"
        },

        3: {
            text: "Overcast",
            icon: "☁️"
        },

        45: {
            text: "Fog",
            icon: "🌫️"
        },

        48: {
            text: "Rime Fog",
            icon: "🌫️"
        },

        51: {
            text: "Light Drizzle",
            icon: "🌦️"
        },

        53: {
            text: "Moderate Drizzle",
            icon: "🌦️"
        },

        55: {
            text: "Dense Drizzle",
            icon: "🌧️"
        },

        61: {
            text: "Light Rain",
            icon: "🌦️"
        },

        63: {
            text: "Moderate Rain",
            icon: "🌧️"
        },

        65: {
            text: "Heavy Rain",
            icon: "🌧️"
        },

        71: {
            text: "Light Snow",
            icon: "🌨️"
        },

        73: {
            text: "Moderate Snow",
            icon: "❄️"
        },

        75: {
            text: "Heavy Snow",
            icon: "❄️"
        },

        80: {
            text: "Light Rain Showers",
            icon: "🌦️"
        },

        81: {
            text: "Moderate Rain Showers",
            icon: "🌧️"
        },

        82: {
            text: "Heavy Rain Showers",
            icon: "⛈️"
        },

        95: {
            text: "Thunderstorm",
            icon: "⛈️"
        },

        96: {
            text: "Thunderstorm with Hail",
            icon: "⛈️"
        },

        99: {
            text: "Heavy Thunderstorm",
            icon: "⛈️"
        }
    };

    return weatherCodes[code] || {
        text: "Unknown",
        icon: "🌤️"
    };
}


// ============================================================
// 6. TEMPERATURE FUNCTIONS
// ============================================================

function convertTemperature(celsius) {

    if (temperatureUnit === "fahrenheit") {
        return (celsius * 9 / 5) + 32;
    }

    return celsius;
}


function formatTemperature(celsius) {

    if (
        celsius === undefined ||
        celsius === null ||
        Number.isNaN(celsius)
    ) {
        return "--";
    }

    return `${Math.round(convertTemperature(celsius))}°`;
}


function getTemperatureUnitSymbol() {

    return temperatureUnit === "fahrenheit"
        ? "F"
        : "C";
}


// ============================================================
// 7. DATE & TIME FUNCTIONS
// ============================================================

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}


function formatTime(timeString) {

    if (!timeString) {
        return "--";
    }

    const date = new Date(timeString);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
}


// ============================================================
// 8. LOADING & ERROR
// ============================================================

function showLoading() {

    if (loading) {
        loading.style.display = "block";
    }

    if (errorMessage) {
        errorMessage.style.display = "none";
    }
}


function hideLoading() {

    if (loading) {
        loading.style.display = "none";
    }
}


function showError(message) {

    hideLoading();

    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
    } else {
        alert(message);
    }
}


// ============================================================
// 9. GET WEATHER
// ============================================================

async function getWeather(city) {

    if (!city) {
        return;
    }

    currentCity = city;

    showLoading();

    try {

        const url =
            `${WEATHER_API}?latitude=${city.latitude}` +
            `&longitude=${city.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,` +
            `precipitation,rain,weather_code,surface_pressure,wind_speed_10m,visibility` +
            `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,` +
            `weather_code,wind_speed_10m` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,` +
            `apparent_temperature_max,apparent_temperature_min,` +
            `precipitation_probability_max,precipitation_sum,sunrise,sunset` +
            `&timezone=Africa%2FAddis_Ababa` +
            `&forecast_days=7`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch weather data.");
        }

        const data = await response.json();

        currentWeatherData = data;

        displayCurrentWeather(city, data);
        displayWeatherDetails(data);
        displaySunTimes(data);
        displayHourlyForecast(data);
        displayDailyForecast(data);
        displayWeeklyReport(data);
        displayAlerts(data);

        updateFavoriteButton();
        updateSideFavoriteButton();

        hideLoading();

    } catch (error) {

        console.error("Weather error:", error);

        showError(
            "Could not load weather information. Please check your internet connection and try again."
        );
    }
}


// ============================================================
// 10. DISPLAY CURRENT WEATHER
// ============================================================

function displayCurrentWeather(city, data) {

    const current = data.current;

    const info = getWeatherInfo(current.weather_code);

    if (cityName) {
        cityName.textContent = city.name;
    }

    if (currentDate) {
        currentDate.textContent = formatDate(current.time);
    }

    if (temperature) {
        temperature.textContent =
            formatTemperature(current.temperature_2m);
    }

    if (weatherCondition) {
        weatherCondition.textContent = info.text;
    }

    if (weatherIcon) {
        weatherIcon.textContent = info.icon;
    }

    if (feelsLike) {

        feelsLike.textContent =
            `${formatTemperature(current.apparent_temperature)} ${getTemperatureUnitSymbol()}`;
    }
}


// ============================================================
// 11. WEATHER DETAILS
// ============================================================

function displayWeatherDetails(data) {

    const current = data.current;
    const daily = data.daily;

    if (humidity) {

        humidity.textContent =
            `${current.relative_humidity_2m}%`;
    }

    if (wind) {

        wind.textContent =
            `${Math.round(current.wind_speed_10m)} km/h`;
    }

    if (pressure) {

        pressure.textContent =
            `${Math.round(current.surface_pressure)} hPa`;
    }

    if (visibility) {

        const visibilityKm =
            current.visibility / 1000;

        visibility.textContent =
            `${visibilityKm.toFixed(1)} km`;
    }

    if (rainChance) {

        const probability =
            daily.precipitation_probability_max?.[0];

        rainChance.textContent =
            probability !== undefined
                ? `${probability}%`
                : "--";
    }
}


// ============================================================
// 12. SUNRISE & SUNSET
// ============================================================

function displaySunTimes(data) {

    const daily = data.daily;

    if (sunrise) {

        sunrise.textContent =
            formatTime(daily.sunrise[0]);
    }

    if (sunset) {

        sunset.textContent =
            formatTime(daily.sunset[0]);
    }
}


// ============================================================
// 13. HOURLY FORECAST
// ============================================================

function displayHourlyForecast(data) {

    if (!hourlyForecast) {
        return;
    }

    hourlyForecast.innerHTML = "";

    const hourly = data.hourly;

    const now = new Date(data.current.time);

    let startIndex = 0;

    for (let i = 0; i < hourly.time.length; i++) {

        const time = new Date(hourly.time[i]);

        if (time >= now) {
            startIndex = i;
            break;
        }
    }

    const numberOfHours = 12;

    for (
        let i = startIndex;
        i < startIndex + numberOfHours && i < hourly.time.length;
        i++
    ) {

        const info =
            getWeatherInfo(hourly.weather_code[i]);

        const card =
            document.createElement("div");

        card.className = "hourly-card";

        const probability =
            hourly.precipitation_probability[i];

        card.innerHTML = `

            <div class="hour-time">
                ${new Date(hourly.time[i]).toLocaleTimeString(
                    "en-US",
                    {
                        hour: "numeric"
                    }
                )}
            </div>

            <div class="hour-icon">
                ${info.icon}
            </div>

            <div class="hour-temp">
                ${formatTemperature(hourly.temperature_2m[i])}
            </div>

            <div class="hour-condition">
                ${info.text}
            </div>

            <div class="hour-rain">
                💧 ${probability ?? 0}%
            </div>

        `;

        hourlyForecast.appendChild(card);
    }
}


// ============================================================
// 14. DAILY FORECAST
// ============================================================

function displayDailyForecast(data) {

    if (!dailyForecast) {
        return;
    }

    dailyForecast.innerHTML = "";

    const daily = data.daily;

    for (let i = 0; i < daily.time.length; i++) {

        const info =
            getWeatherInfo(daily.weather_code[i]);

        const date =
            new Date(daily.time[i]);

        const dayName =
            i === 0
                ? "Today"
                : date.toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                );

        const rain =
            daily.precipitation_probability_max?.[i] ?? 0;

        const card =
            document.createElement("div");

        card.className = "daily-card";

        card.innerHTML = `

            <div class="daily-day">
                ${dayName}
            </div>

            <div class="daily-icon">
                ${info.icon}
            </div>

            <div class="daily-condition">
                ${info.text}
            </div>

            <div class="daily-temperature">
                <strong>
                    ${formatTemperature(daily.temperature_2m_max[i])}
                </strong>

                <span>
                    ${formatTemperature(daily.temperature_2m_min[i])}
                </span>
            </div>

            <div class="daily-rain">
                💧 ${rain}%
            </div>

        `;

        dailyForecast.appendChild(card);
    }
}


// ============================================================
// 15. WEEKLY REPORT
// ============================================================

function displayWeeklyReport(data) {

    if (!weeklyReportContent) {
        return;
    }

    const daily = data.daily;

    const maxTemps =
        daily.temperature_2m_max;

    const minTemps =
        daily.temperature_2m_min;

    const rainProbabilities =
        daily.precipitation_probability_max || [];

    const highest =
        Math.max(...maxTemps);

    const lowest =
        Math.min(...minTemps);

    const average =
        maxTemps.reduce(
            (sum, temp) => sum + temp,
            0
        ) / maxTemps.length;

    const rainyDays =
        rainProbabilities.filter(
            probability => probability >= 50
        ).length;

    weeklyReportContent.innerHTML = `

        <div class="report-card">

            <div class="report-icon">
                🌡️
            </div>

            <div>
                <span>Highest Temperature</span>
                <strong>
                    ${formatTemperature(highest)}
                </strong>
            </div>

        </div>


        <div class="report-card">

            <div class="report-icon">
                ❄️
            </div>

            <div>
                <span>Lowest Temperature</span>
                <strong>
                    ${formatTemperature(lowest)}
                </strong>
            </div>

        </div>


        <div class="report-card">

            <div class="report-icon">
                📊
            </div>

            <div>
                <span>Average High</span>
                <strong>
                    ${formatTemperature(average)}
                </strong>
            </div>

        </div>


        <div class="report-card">

            <div class="report-icon">
                🌧️
            </div>

            <div>
                <span>Rainy Days</span>
                <strong>
                    ${rainyDays} / ${rainProbabilities.length}
                </strong>
            </div>

        </div>

    `;
}


// ============================================================
// 16. WEATHER ALERTS
// ============================================================

function displayAlerts(data) {

    if (!alertsContainer) {
        return;
    }

    alertsContainer.innerHTML = "";

    const daily = data.daily;

    const maxTemp =
        Math.max(...daily.temperature_2m_max);

    const maxRain =
        Math.max(
            ...(daily.precipitation_probability_max || [0])
        );

    let alerts = [];

    if (maxTemp >= 32) {

        alerts.push({
            icon: "🔥",
            title: "High Temperature",
            message:
                "Temperatures may become high during the forecast period. Stay hydrated and avoid excessive heat."
        });
    }

    if (maxRain >= 70) {

        alerts.push({
            icon: "🌧️",
            title: "Rain Alert",
            message:
                "There is a high probability of rain on one or more forecast days. Consider carrying an umbrella."
        });
    }

    if (alerts.length === 0) {

        alerts.push({
            icon: "✅",
            title: "No Major Alerts",
            message:
                "No significant weather alerts were detected for the current forecast."
        });
    }

    alerts.forEach(alert => {

        const alertElement =
            document.createElement("div");

        alertElement.className = "weather-alert";

        alertElement.innerHTML = `

            <div class="alert-icon">
                ${alert.icon}
            </div>

            <div>
                <strong>${alert.title}</strong>
                <p>${alert.message}</p>
            </div>

        `;

        alertsContainer.appendChild(alertElement);
    });
}


// ============================================================
// 17. FAVORITES
// ============================================================

function saveFavorites() {

    localStorage.setItem(
        "favoriteCities",
        JSON.stringify(favoriteCities)
    );
}


function isFavorite(city) {

    return favoriteCities.some(
        favorite =>
            favorite.name === city.name &&
            Math.abs(
                favorite.latitude - city.latitude
            ) < 0.0001 &&
            Math.abs(
                favorite.longitude - city.longitude
            ) < 0.0001
    );
}


function addFavoriteCity() {

    if (!currentCity) {
        return;
    }

    if (!isFavorite(currentCity)) {

        favoriteCities.push({
            name: currentCity.name,
            latitude: currentCity.latitude,
            longitude: currentCity.longitude
        });

        saveFavorites();

        displayFavorites();
        updateFavoriteButton();
        updateSideFavoriteButton();
    }
}


function removeFavoriteCity(index) {

    favoriteCities.splice(index, 1);

    saveFavorites();

    displayFavorites();

    updateFavoriteButton();
    updateSideFavoriteButton();
}


function toggleFavorite() {

    if (!currentCity) {
        return;
    }

    const existingIndex =
        favoriteCities.findIndex(
            favorite =>
                favorite.name === currentCity.name
        );

    if (existingIndex !== -1) {

        removeFavoriteCity(existingIndex);

    } else {

        addFavoriteCity();
    }
}


function updateFavoriteButton() {

    if (!favoriteButton) {
        return;
    }

    if (isFavorite(currentCity)) {

        favoriteButton.textContent =
            "❤️ Remove Favorite";

        favoriteButton.classList.add("active");

    } else {

        favoriteButton.textContent =
            "♡ Add Favorite";

        favoriteButton.classList.remove("active");
    }
}


function updateSideFavoriteButton() {

    if (!sideFavoriteButton) {
        return;
    }

    if (isFavorite(currentCity)) {

        sideFavoriteButton.textContent =
            "❤️ Remove Favorite";

    } else {

        sideFavoriteButton.textContent =
            "♡ Add Current City";
    }
}


function displayFavorites() {

    if (!favoritesList) {
        return;
    }

    favoritesList.innerHTML = "";

    if (favoriteCities.length === 0) {

        favoritesList.innerHTML = `
            <p class="empty-message">
                No favorite cities yet.
            </p>
        `;

        return;
    }

    favoriteCities.forEach((city, index) => {

        const item =
            document.createElement("div");

        item.className = "favorite-city";

        item.innerHTML = `

            <button
                class="favorite-city-button"
                data-index="${index}"
            >

                <span class="favorite-city-name">
                    📍 ${city.name}
                </span>

            </button>

            <button
                class="remove-favorite"
                data-remove="${index}"
                title="Remove favorite"
            >
                ×
            </button>

        `;

        favoritesList.appendChild(item);
    });

    const cityButtons =
        favoritesList.querySelectorAll(
            ".favorite-city-button"
        );

    cityButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(button.dataset.index);

                getWeather(favoriteCities[index]);
            }
        );
    });


    const removeButtons =
        favoritesList.querySelectorAll(
            ".remove-favorite"
        );

    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const index =
                    Number(button.dataset.remove);

                removeFavoriteCity(index);
            }
        );
    });
}


function clearFavorites() {

    favoriteCities = [];

    saveFavorites();

    displayFavorites();

    updateFavoriteButton();
    updateSideFavoriteButton();
}


// ============================================================
// 18. MAJOR CITIES
// ============================================================

function displayMajorCities() {

    if (!majorCitiesList) {
        return;
    }

    majorCitiesList.innerHTML = "";

    majorCities.forEach(city => {

        const card =
            document.createElement("div");

        card.className = "major-city-card";

        card.innerHTML = `

            <div class="major-city-icon">
                🌤️
            </div>

            <div class="major-city-info">

                <h3>
                    ${city.name}
                </h3>

                <button class="view-city">
                    View Weather
                </button>

            </div>

        `;

        card
            .querySelector(".view-city")
            .addEventListener(
                "click",
                () => getWeather(city)
            );

        majorCitiesList.appendChild(card);
    });
}


// ============================================================
// 19. SEARCH ETHIOPIAN CITIES
// ============================================================

async function searchCity() {

    const query =
        citySearch?.value.trim();

    if (!query) {
        return;
    }

    if (searchResults) {
        searchResults.innerHTML = `
            <div class="search-result">
                Searching...
            </div>
        `;

        searchResults.style.display = "block";
    }

    try {

        const url =
            `${GEOCODING_API}?name=${encodeURIComponent(query)}` +
            `&count=10&language=en&format=json`;

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error("Search failed.");
        }

        const data =
            await response.json();

        const results =
            (data.results || []).filter(
                place =>
                    place.country_code === "ET"
            );

        displaySearchResults(results);

    } catch (error) {

        console.error(error);

        if (searchResults) {

            searchResults.innerHTML = `
                <div class="search-result">
                    Unable to search cities.
                </div>
            `;
        }
    }
}


function displaySearchResults(results) {

    if (!searchResults) {
        return;
    }

    searchResults.innerHTML = "";

    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="search-result">
                No Ethiopian city found.
            </div>
        `;

        searchResults.style.display = "block";

        return;
    }

    results.forEach(place => {

        const result =
            document.createElement("div");

        result.className =
            "search-result";

        result.innerHTML = `

            <strong>
                📍 ${place.name}
            </strong>

            <span>
                ${place.admin1 || "Ethiopia"}
            </span>

        `;

        result.addEventListener(
            "click",
            () => {

                const city = {

                    name: place.name,

                    latitude: place.latitude,

                    longitude: place.longitude
                };

                citySearch.value = place.name;

                searchResults.style.display =
                    "none";

                getWeather(city);
            }
        );

        searchResults.appendChild(result);
    });

    searchResults.style.display = "block";
}


// ============================================================
// 20. TEMPERATURE UNIT SETTING
// ============================================================

function setupTemperatureUnit() {

    if (!temperatureUnitSelect) {
        return;
    }

    temperatureUnitSelect.value =
        temperatureUnit;

    temperatureUnitSelect.addEventListener(
        "change",
        () => {

            temperatureUnit =
                temperatureUnitSelect.value;

            localStorage.setItem(
                "temperatureUnit",
                temperatureUnit
            );

            if (currentWeatherData) {

                displayCurrentWeather(
                    currentCity,
                    currentWeatherData
                );

                displayWeatherDetails(
                    currentWeatherData
                );

                displayHourlyForecast(
                    currentWeatherData
                );

                displayDailyForecast(
                    currentWeatherData
                );

                displayWeeklyReport(
                    currentWeatherData
                );
            }
        }
    );
}


// ============================================================
// 21. AUTO LOCATION
// ============================================================

async function useAutoLocation() {

    if (!navigator.geolocation) {

        showError(
            "Your browser does not support location services."
        );

        return;
    }

    showLoading();

    navigator.geolocation.getCurrentPosition(

        async position => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            try {

                const url =
                    `${GEOCODING_API}?latitude=${latitude}` +
                    `&longitude=${longitude}` +
                    `&count=1&language=en&format=json`;

                const response =
                    await fetch(url);

                const data =
                    await response.json();

                const place =
                    data.results?.[0];

                const city = {

                    name:
                        place?.name ||
                        "Your Location",

                    latitude,

                    longitude
                };

                getWeather(city);

            } catch (error) {

                console.error(error);

                getWeather({
                    name: "Your Location",
                    latitude,
                    longitude
                });
            }
        },

        error => {

            hideLoading();

            showError(
                "Location permission was not available. Please search for your city instead."
            );
        }
    );
}


// ============================================================
// 22. NAVIGATION
// ============================================================

function setupNavigation() {

    const navigationLinks =
        document.querySelectorAll(
            ".sidebar nav a"
        );

    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    targetId &&
                    targetId.startsWith("#")
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            }
        );
    });
}


// ============================================================
// 23. MAP CITY BUTTONS
// ============================================================

function setupMapButtons() {

    const mapButtons =
        document.querySelectorAll(
            "[data-city-index]"
        );

    mapButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.cityIndex
                    );

                if (majorCities[index]) {

                    getWeather(
                        majorCities[index]
                    );
                }
            }
        );
    });
}


// ============================================================
// 24. EVENT LISTENERS
// ============================================================

function setupEventListeners() {

    // Search button
    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchCity
        );
    }


    // Search with Enter
    if (citySearch) {

        citySearch.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchCity();
                }
            }
        );
    }


    // Favorite button
    if (favoriteButton) {

        favoriteButton.addEventListener(
            "click",
            toggleFavorite
        );
    }


    // Sidebar favorite button
    if (sideFavoriteButton) {

        sideFavoriteButton.addEventListener(
            "click",
            toggleFavorite
        );
    }


    // Clear favorites
    if (clearFavoritesButton) {

        clearFavoritesButton.addEventListener(
            "click",
            clearFavorites
        );
    }


    // Refresh
    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            () => {

                getWeather(currentCity);
            }
        );
    }


    // Auto location
    const autoLocationButton =
        document.getElementById(
            "auto-location"
        );

    if (autoLocationButton) {

        autoLocationButton.addEventListener(
            "click",
            useAutoLocation
        );
    }


    // Search results close when clicking outside
    document.addEventListener(
        "click",
        event => {

            if (
                searchResults &&
                citySearch &&
                !searchResults.contains(event.target) &&
                !citySearch.contains(event.target) &&
                event.target !== searchButton
            ) {

                searchResults.style.display =
                    "none";
            }
        }
    );
}


// ============================================================
// 25. INITIALIZE APPLICATION
// ============================================================

function initializeApp() {

    displayFavorites();

    displayMajorCities();

    setupEventListeners();

    setupTemperatureUnit();

    setupNavigation();

    setupMapButtons();

    getWeather(majorCities[0]);
}


// ============================================================
// 26. START APP
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);