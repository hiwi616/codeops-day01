// ===== Cache element references once =====
const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const errorMessage = document.getElementById("form-error");

const itemList = document.getElementById("item-list");
const emptyState = document.getElementById("empty-state");
const itemCount = document.getElementById("item-count");
const totalAmount = document.getElementById("total-amount");

// ===== State =====
// Each item: { id, name, price, bought }
let items = [];
let nextId = 1;

// ===== Rendering a single row (createElement + append, no string rebuild) =====
function createItemRow(item) {
  const row = document.createElement("li");
  row.className = "item-row";
  row.dataset.id = item.id;
  if (item.bought) {
    row.classList.add("bought");
  }

  const nameSpan = document.createElement("span");
  nameSpan.className = "item-name";
  nameSpan.textContent = item.name;

  const priceSpan = document.createElement("span");
  priceSpan.className = "item-price";
  priceSpan.textContent = `ETB ${item.price.toFixed(2)}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Remove";
  // Marks this button so the delegated listener can tell a delete
  // was clicked, rather than a toggle on the row itself.
  deleteBtn.dataset.action = "delete";

  row.append(nameSpan, priceSpan, deleteBtn);
  return row;
}

// ===== Add a new item to state + DOM =====
function addItem(name, price) {
  const item = { id: nextId++, name, price, bought: false };
  items.push(item);
  itemList.append(createItemRow(item));
  updateSummary();
}

// ===== Remove an item from state + DOM =====
function removeItem(id) {
  items = items.filter((item) => item.id !== id);
  const row = itemList.querySelector(`[data-id="${id}"]`);
  if (row) {
    row.remove();
  }
  updateSummary();
}

// ===== Toggle bought state =====
function toggleBought(id) {
  const item = items.find((item) => item.id === id);
  if (!item) return;
  item.bought = !item.bought;

  const row = itemList.querySelector(`[data-id="${id}"]`);
  if (row) {
    row.classList.toggle("bought", item.bought);
  }
}

// ===== Live running total + item count + empty state =====
function updateSummary() {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  totalAmount.textContent = total.toFixed(2);

  itemCount.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

  emptyState.hidden = items.length !== 0;
}

// ===== Form submit: add item =====
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const priceValue = priceInput.value.trim();
  const price = parseFloat(priceValue);

  const isValid = name.length > 0 && priceValue.length > 0 && !Number.isNaN(price) && price >= 0;

  if (!isValid) {
    errorMessage.hidden = false;
    return;
  }

  errorMessage.hidden = true;
  addItem(name, price);

  form.reset();
  nameInput.focus();
});

// Hide the error as soon as the user starts fixing the form
[nameInput, priceInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (!errorMessage.hidden) {
      errorMessage.hidden = true;
    }
  });
});

// ===== Single delegated listener on the list container =====
// Handles both "Remove" clicks and row clicks (toggle bought).
itemList.addEventListener("click", (event) => {
  const row = event.target.closest(".item-row");
  if (!row) return;

  const id = Number(row.dataset.id);

  if (event.target.closest('[data-action="delete"]')) {
    removeItem(id);
    return;
  }

  toggleBought(id);
});

// ===== Initial render =====
updateSummary();
