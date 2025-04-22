function convertTemperature() {
  // Define const kelvin to hold the value of the temperature in kelvin
  const kelvin = 0;

  // Define const celsius to hold the value of the temperature in celsius
  const celsius = kelvin - 273;

  // Convert to Newton
  let newton = celsius * (33 / 100);

  // Round down
  newton = Math.floor(newton);

  // Define const fahrenheit to hold the value of the temperature in fahrenheit
  let fahrenheit = celsius * (9 / 5) + 32;

  // Round down
  fahrenheit = Math.floor(fahrenheit);

  console.log(`The temperature is ${fahrenheit} degrees in Fahrenheit.`);
  console.log(`The temperature is ${newton} degrees in Newton.`);
}

convertTemperature();
