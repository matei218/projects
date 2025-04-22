const getSleepHours = (day) => {
  switch (day) {
    case "Monday":
      return 7;
    case "Tuesday":
      return 7;
    case "Wednesday":
      return 9;
    case "Thursday":
      return 6;
    case "Friday":
      return 8;
    case "Saturday":
      return 9;
    case "Sunday":
      return 8;
    default:
      return 0; 
  }
};

const getActualSleepHours = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let totalSleep = 0;
  for (const day of days) {
    totalSleep += getSleepHours(day);
  }
  return totalSleep;
};

document.querySelector('.actual_hours').textContent = 'Actual sleep hours per week: ' + getActualSleepHours();

const getIdealSleepHours = () => {
  const idealHours = 7;
  return idealHours * 7;
};

document.querySelector('.ideal_hours').textContent = 'Ideal sleep hours per week: ' + getIdealSleepHours();

const calculateSleepDebt = () => {
  const actualSleepHours = getActualSleepHours();
  const idealSleepHours = getIdealSleepHours();

  if (actualSleepHours === idealSleepHours) {
    return "Perfect amount!";
  } else if (actualSleepHours > idealSleepHours) {
    return "You got more sleep by: " + (actualSleepHours - idealSleepHours) + " hours!";
  } else {
    return "You got less sleep by: " + (idealSleepHours - actualSleepHours) + " hours!";
  }
};

document.querySelector('.sleep_debt').textContent = calculateSleepDebt();
