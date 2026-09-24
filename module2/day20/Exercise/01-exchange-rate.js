// 1. Write an async function that fetches the USD -> ETB rate from a
//    public exchange-rate API, checks res.ok, and returns the rate.

async function getUsdToEtbRate() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");

  if (!res.ok) {
    throw new Error(`Exchange rate API request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.rates.ETB;
}

async function main() {
  try {
    const rate = await getUsdToEtbRate();
    console.log(`1 USD = ${rate} ETB`);
  } catch (err) {
    console.error("Could not fetch the exchange rate:", err.message);
  }
}

main();

module.exports = { getUsdToEtbRate };
