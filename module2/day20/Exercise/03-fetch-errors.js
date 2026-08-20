// 3. Fetch a deliberately wrong URL and confirm your catch block runs;
//    then fetch a real URL that returns 404 and show why you also
//    need res.ok.

async function fetchWithOkCheck(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}

// --- Part A: a deliberately wrong (nonexistent) domain -----------------
// This fails at the NETWORK level - fetch() itself rejects before we
// ever get a response object, so this always lands in the catch block
// no matter whether we check res.ok or not.
async function testWrongUrl() {
  console.log("--- Part A: deliberately wrong URL ---");
  try {
    await fetchWithOkCheck("https://this-domain-does-not-exist-abc123xyz.invalid/data");
    console.log("Unexpected: no error was thrown.");
  } catch (err) {
    console.log("Caught as expected:", err.name, "-", err.message);
  }
}

// --- Part B: a real URL that returns HTTP 404 --------------------------
// This fetch call SUCCEEDS at the network level - the server responded,
// so fetch() resolves normally. The response just has a 404 status.
// Without checking res.ok, this would be silently treated as a success
// and res.json() would happily parse whatever error body the server
// sent back, hiding the fact that the request actually failed.
async function testRealNotFound() {
  console.log("\n--- Part B: real URL returning 404 ---");

  const url = "https://jsonplaceholder.typicode.com/users/99999";
  const res = await fetch(url);

  console.log("fetch() resolved without throwing. res.ok:", res.ok, "| res.status:", res.status);

  if (!res.ok) {
    console.log("Without checking res.ok, we would have mistaken this 404 for a success.");
  }

  try {
    await fetchWithOkCheck(url);
  } catch (err) {
    console.log("With the res.ok check, we correctly catch it as an error:", err.message);
  }
}

(async () => {
  await testWrongUrl();
  await testRealNotFound();
})();

module.exports = { fetchWithOkCheck };
