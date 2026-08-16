// ============================================================
// 1. Select an <h1>, change its text with textContent,
//    then toggle a CSS class with classList.toggle
// ============================================================
const heading = document.querySelector("#main-heading");
const changeHeadingBtn = document.querySelector("#change-heading-btn");

changeHeadingBtn.addEventListener("click", () => {
  heading.textContent = "Day 19 - Now with DOM powers!";
  heading.classList.toggle("highlight");
});

// ============================================================
// 2. Given an array of three Ethiopian city names,
//    create an <li> for each with createElement and append
// ============================================================
const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];
const cityList = document.querySelector("#city-list");

cities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.append(li);
});

// ============================================================
// 3. Add a click listener to a button that logs event.target,
//    then wrap the button in a div with its own listener
//    and observe bubbling
// ============================================================
const bubbleBtn = document.querySelector("#bubble-btn");
const outerBox = document.querySelector("#outer-box");
const log = document.querySelector("#log");

function writeLog(message) {
  log.textContent += message + "\n";
}

bubbleBtn.addEventListener("click", (event) => {
  writeLog(`Button listener -> event.target: ${event.target.tagName}#${event.target.id}`);
});

outerBox.addEventListener("click", (event) => {
  writeLog(`Div listener (bubbled) -> event.target: ${event.target.tagName}#${event.target.id || "(none)"}`);
});

// ============================================================
// 4. Build a list of items each with a delete button,
//    and remove any item using a single delegated listener
//    on the parent
// ============================================================
const deleteList = document.querySelector("#delete-list");

deleteList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const item = event.target.closest("li");
    item.remove();
  }
});

// ============================================================
// 5. Add a form with one text input; on submit, preventDefault,
//    read input.value, append it to a list, and clear the field
// ============================================================
const addItemForm = document.querySelector("#add-item-form");
const itemInput = document.querySelector("#item-input");
const submittedList = document.querySelector("#submitted-list");

addItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = itemInput.value.trim();
  if (value === "") return;

  const li = document.createElement("li");
  li.textContent = value;
  submittedList.append(li);

  itemInput.value = "";
});
