function getCurrentDateTime() {
  const dayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDay = dayOfTheWeek[currentDate.getDay()];

  const currentHours = currentDate.getHours();
  const ampm = currentHours >= 12 ? 'PM' : 'AM';
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const formatTime = `${currentHours}:${currentMinutes}:${currentSeconds} ${ampm}`;

  console.log(`The current time is: ${formatTime}`);
  console.log(`Today is : ${currentDay}.`);
}

getCurrentDateTime();

function getRegistrationTime() {
  const age = parseInt(document.getElementById('age').value);
  const registrationType = document.getElementById('registrationType').value;
  let raceNumber = Math.floor(Math.random() * 1000);

  if (age > 18 && registrationType === 'early') {
    raceNumber += 1000;
  }

  if (age > 18 && registrationType === 'early') {
    document.getElementById('registrationResult').textContent = 'Race will start at 9:30am for ' + raceNumber + '.';
  } else if (age > 18 && registrationType === 'late') {
    document.getElementById('registrationResult').textContent = 'Race will start at 11:00am for ' + raceNumber + '.';
  } else if (age < 18) {
    document.getElementById('registrationResult').textContent = 'Youth registrants ' + raceNumber + ' run at 12:30 pm (regardless of registration).';
  } else {
    document.getElementById('registrationResult').textContent = 'Runners who are 18 years old and registered early should see the registration desk.';
  }
}
