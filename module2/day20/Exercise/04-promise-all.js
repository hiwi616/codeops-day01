// 4. Fetch a list from a public API and use Promise.all to fetch
//    details for the first two items in parallel.

async function fetchWithOkCheck(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}

async function fetchFirstTwoUsersWithPosts() {
  // Step 1: fetch the list of users
  const users = await fetchWithOkCheck("https://jsonplaceholder.typicode.com/users");
  const firstTwoUsers = users.slice(0, 2);

  console.log(
    "First two users:",
    firstTwoUsers.map((u) => u.name)
  );

  // Step 2: fetch each of their posts IN PARALLEL using Promise.all,
  // instead of awaiting them one at a time.
  const postsByUser = await Promise.all(
    firstTwoUsers.map((user) =>
      fetchWithOkCheck(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
    )
  );

  firstTwoUsers.forEach((user, index) => {
    console.log(`\n${user.name} has ${postsByUser[index].length} posts. First post title:`);
    console.log(` "${postsByUser[index][0].title}"`);
  });
}

async function main() {
  try {
    await fetchFirstTwoUsersWithPosts();
  } catch (err) {
    console.error("Failed to fetch users/posts:", err.message);
  }
}

main();

module.exports = { fetchFirstTwoUsersWithPosts };
