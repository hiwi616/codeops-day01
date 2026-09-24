// 2. Write a makeCounter closure that returns a function incrementing
//    a private count. Call it several times and explain why count stays private.

function makeCounter() {
  let count = 0; // private variable - only accessible inside this closure

  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();

console.log("First call:", counter());
console.log("Second call:", counter());
console.log("Third call:", counter());

// A second, independent counter to show each closure has its own private count
const counter2 = makeCounter();
console.log("counter2 first call:", counter2());
console.log("counter (still going):", counter());

// Why count stays private:
// `count` is a local variable declared inside makeCounter(). The inner
// function returned by makeCounter() forms a closure over that variable,
// meaning it "remembers" and can access `count` even after makeCounter()
// has finished running. However, `count` is never exposed directly -
// there is no way to reach it from outside except by calling the
// returned function itself. JavaScript has no way to reach into a
// function's local scope from the outside, so `count` is effectively
// a private variable, encapsulated by the closure.

module.exports = { makeCounter };
