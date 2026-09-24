// 5. Use forEach (a callback) to print each Ethiopian city in an array
//    with its index, e.g. "1. Addis Ababa".

const ethiopianCities = ["Addis Ababa", "Bahir Dar", "Hawassa", "Mekelle", "Gondar"];

ethiopianCities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});

module.exports = { ethiopianCities };
