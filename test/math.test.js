const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} = require("../src/testfuncs/math");

test("Should calc total with tip", () => {
  const total = calculateTip(10, 0.3);
  //! Instead of writing this if statement we can use "ASSERT"
  // if (total !== 13) {
  //   throw new Error("Total tip should be 13. Got " + total);
  // }
  expect(total).toBe(13);
});

test("Should calc total with default tip", () => {
  const total = calculateTip(10);
  expect(total).toBe(12.5);
});

test("Should convert 32 F to 0 C", () => {
  const cels = fahrenheitToCelsius(32);
  expect(cels).toBe(0);
});
test("Should convert 0 C to 32 F", () => {
  const fahr = celsiusToFahrenheit(0);
  expect(fahr).toBe(32);
});

//!To tell jest we are running async code we need to pass an arguement and call it at the end
// test("Async test demo", () => {
//   setTimeout(() => {
//     expect(1).toBe(2);
//     done();
//   }),
//     2000;
// });
//!for async functions we can use .then((val)=> expect(val).toBe(x) then call done())
//! or use async await and then we don't need to use the done arguement
