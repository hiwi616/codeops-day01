// app.js - ETB Currency Converter & Watchlist
// Built in the order given on the reading sheet, steps 1-6.

// ---- Step 1: cache element references once, declare state -------------

const statusEl = document.querySelector("#status");
const convertForm = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount-input");
const currencySelect = document.querySelector("#currency-select");
const resultEl = document.querySelector("#result");
const watchCurrencySelect = document.querySelector("#watch-currency-select");
const addWatchBtn = document.querySelector("#add-watch-btn");
const watchlistEl = document.querySelector("#watchlist");

const STORAGE_KEY = "currencyWatchlist";

const state = {
  rates: {}, // e.g. { USD: 0.0177, KES: 2.29 }
  watchlist: [], // e.g. ["USD", "KES"]
};

// ---- Step 2: render() against state.rates -------------------------------
// Fills both currency dropdowns from whatever is currently in state.rates.
// This was first tested against hard-coded fake rates (see the bottom of
// this file, commented out) before loadRates() ever touched the network.

function render() {
  const currencies = Object.keys(state.rates);

  currencySelect.textContent = "";
  watchCurrencySelect.textContent = "";

  currencies.forEach((code) => {
    const option1 = document.createElement("option");
    option1.value = code;
    option1.textContent = code;
    currencySelect.append(option1);

    const option2 = document.createElement("option");
    option2.value = code;
    option2.textContent = code;
    watchCurrencySelect.append(option2);
  });
}

// ---- Step 3: loadRates() - replace fake data with a live fetch ----------

async function loadRates() {
  statusEl.className = "loading";
  statusEl.textContent = "Loading rates...";

  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/ETB");

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    state.rates = data.rates;

    statusEl.className = "";
    statusEl.textContent = "";
    render();
  } catch (err) {
    statusEl.className = "error";
    statusEl.textContent = `Could not load exchange rates: ${err.message}`;
  }
}

// ---- Step 4: wire the convert form ---------------------------------------

function handleConvertSubmit(event) {
  event.preventDefault();

  const rawAmount = amountInput.value.trim();
  const currency = currencySelect.value;

  if (rawAmount === "") {
    resultEl.textContent = "Please enter an amount.";
    return;
  }

  const amount = Number(rawAmount);

  if (Number.isNaN(amount) || amount < 0) {
    resultEl.textContent = "Please enter a valid, non-negative amount.";
    return;
  }

  const rate = state.rates[currency];
  if (rate === undefined) {
    resultEl.textContent = "Please select a currency.";
    return;
  }

  const converted = amount * rate;
  resultEl.textContent = `${amount} ETB = ${converted.toFixed(2)} ${currency}`;
}

convertForm.addEventListener("submit", handleConvertSubmit);

// ---- Step 5: watchlist ----------------------------------------------------

function renderWatchlist() {
  watchlistEl.textContent = "";

  state.watchlist.forEach((code) => {
    const row = document.createElement("li");
    row.dataset.c = code;

    const label = document.createElement("span");
    const rate = state.rates[code];
    label.textContent = rate !== undefined ? `${code}: ${rate}` : code;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";

    row.append(label, removeBtn);
    watchlistEl.append(row);
  });
}

function handleAddWatch() {
  const code = watchCurrencySelect.value;
  if (!code) return;

  if (state.watchlist.includes(code)) {
    return; // guard against duplicates
  }

  state.watchlist.push(code);
  renderWatchlist();
  save(); // step 6: persist on change
}

addWatchBtn.addEventListener("click", handleAddWatch);

// A SINGLE delegated listener on the list handles removal for every row,
// current and future, by reading the row's data-c attribute.
watchlistEl.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".remove-btn");
  if (!removeBtn) return;

  const row = event.target.closest("li");
  const code = row.dataset.c;

  state.watchlist = state.watchlist.filter((c) => c !== code);
  renderWatchlist();
  save(); // step 6: persist on change
});

// ---- Step 6: save() / load() with localStorage ---------------------------

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.watchlist));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Corrupt watchlist data in localStorage, resetting:", err.message);
    return [];
  }
}

// ---- init() ----------------------------------------------------------------

async function init() {
  state.watchlist = load(); // step 6: restore saved watchlist
  await loadRates(); // step 3: fetch live rates (also calls render())
  renderWatchlist(); // step 5: render the restored watchlist against loaded rates
}

init();

// ---- Step 2 reference: how render() was first tested with fake data ------
// Before loadRates() existed, step 2 was verified like this:
//
// state.rates = { USD: 0.0177, KES: 2.29 };
// render();
//
// ...confirming the dropdowns filled correctly before any network code
// was written at all.
