const calculateTip = (total, tipPerc = 0.25) => total + total * tipPerc;
const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;

const celsiusToFahrenheit = (temp) => temp * 1.8 + 32;

module.exports = { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit };
