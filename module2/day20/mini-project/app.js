// app.js
//
// Country Facts - fetches country data from restcountries.com and
// renders it into the DOM. No framework, just fetch + async/await + DOM.

// ---- Cache element references once -----------------------------------
const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const loadingEl = document.querySelector("#loading");
const errorEl = document.querySelector("#error-message");
const cardEl = document.querySelector("#country-card");

const API_BASE = "https://restcountries.com/v3.1/name/";

// ---- UI state helpers ---------------------------------------------------

function showLoading() {
  loadingEl.hidden = false;
  errorEl.hidden = true;
  cardEl.hidden = true;
}

function hideLoading() {
  loadingEl.hidden = true;
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  cardEl.hidden = true;
}

function clearError() {
  errorEl.hidden = true;
}

// ---- Formatting helpers --------------------------------------------------

function formatPopulation(number) {
  return number.toLocaleString("en-US");
}

function formatCurrencies(currencies) {
  if (!currencies) return "N/A";
  return Object.values(currencies)
    .map((currency) => `${currency.name} (${currency.symbol || "?"})`)
    .join(", ");
}

// ---- Rendering (createElement, no innerHTML string building) -----------

function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function renderCountry(country) {
  clearElement(cardEl); // clear previous card's children before rebuilding

  const flagImg = document.createElement("img");
  flagImg.className = "flag";
  flagImg.src = country.flags?.png || country.flags?.svg || "";
  flagImg.alt = `Flag of ${country.name.common}`;

  const heading = document.createElement("h2");
  heading.textContent = country.name.common;

  const list = document.createElement("dl");

  const capital = country.capital ? country.capital[0] : "N/A";
  const population = formatPopulation(country.population);
  const region = country.region || "N/A";
  const currencies = formatCurrencies(country.currencies);

  const facts = [
    ["Capital", capital],
    ["Population", population],
    ["Region", region],
    ["Currencies", currencies],
  ];

  facts.forEach(([label, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = label;

    const dd = document.createElement("dd");
    dd.textContent = value;

    list.append(dt, dd);
  });

  cardEl.append(flagImg, heading, list);
  cardEl.hidden = false;
}

// ---- Fetching -------------------------------------------------------------

async function fetchCountry(countryName) {
  const res = await fetch(`${API_BASE}${encodeURIComponent(countryName)}`);

  if (!res.ok) {
    throw new Error("Country not found");
  }

  const data = await res.json();
  return data[0]; // restcountries returns an array of matches; use the first
}

async function searchCountry(countryName) {
  showLoading();

  try {
    const country = await fetchCountry(countryName);
    clearError();
    renderCountry(country);
  } catch (err) {
    showError("Country not found. Please check the spelling and try again.");
  } finally {
    hideLoading();
  }
}

// ---- Events -----------------------------------------------------------------

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const countryName = input.value.trim();
  if (countryName === "") return;
  searchCountry(countryName);
});

// ---- Default to Ethiopia on first load ---------------------------------
input.value = "Ethiopia";
searchCountry("Ethiopia");
