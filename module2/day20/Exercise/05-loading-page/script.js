// script.js
//
// Shows "Loading...", then either the fetched data or an error
// message, by swapping the CSS class and text content of #status.

const statusEl = document.querySelector("#status");
const reloadBtn = document.querySelector("#reload-btn");

function setLoading() {
  statusEl.className = "loading";
  statusEl.textContent = "Loading...";
}

function setSuccess(rate) {
  statusEl.className = "success";
  statusEl.textContent = `1 USD = ${rate} ETB`;
}

function setError(message) {
  statusEl.className = "error";
  statusEl.textContent = `Error: ${message}`;
}

async function loadRate() {
  setLoading(); // state 1: loading

  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    setSuccess(data.rates.ETB); // state 2: success
  } catch (err) {
    setError(err.message); // state 3: error (e.g. network offline)
  }
}

reloadBtn.addEventListener("click", loadRate);

loadRate();
