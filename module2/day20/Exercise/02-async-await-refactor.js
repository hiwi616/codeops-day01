// 2. Rewrite a three-step .then chain (fetch -> json -> render) as an
//    async function using await and try/catch.

// ---- BEFORE: the .then chain version -------------------------------
//
// function loadUsersThenChain() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((res) => res.json())
//     .then((users) => renderUsers(users))
//     .catch((err) => console.error("Failed to load users:", err.message));
// }

// ---- AFTER: the async/await + try/catch version ---------------------

function renderUsers(users) {
  console.log(`Rendering ${users.length} users:`);
  users.forEach((user) => {
    console.log(` - ${user.name} (${user.email})`);
  });
}

async function loadUsersAsync() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const users = await res.json();
    renderUsers(users);
  } catch (err) {
    console.error("Failed to load users:", err.message);
  }
}

loadUsersAsync();

module.exports = { loadUsersAsync, renderUsers };
