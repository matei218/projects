const getRandEvent = () => {
  const random = Math.floor(Math.random() * 3);
  if (random === 0) {
    return "Marathon";
  } else if (random === 1) {
    return "Triathlon";
  } else if (random === 2) {
    return "Pentathlon";
  }
};

const getTrainingDays = (defaultEvent) => {
  let generalDays = "";
  if (defaultEvent === "Marathon") {
    generalDays = 50;
  } else if (defaultEvent === "Triathlon") {
    generalDays = 100;
  } else if (defaultEvent === "Pentathlon") {
    generalDays = 200;
  }

  return generalDays;
};

const defaultName = "Nala";
const logEvent = (defaultName, defaultEvent) => {
  console.log(`${defaultName}'s event is: ${defaultEvent}`);
};

const logTime = (defaultName, generalDays) => {
  console.log(`${defaultName}'s time to train is: ${generalDays} days`);
};

const defaultEvent = getRandEvent();
const generalDays = getTrainingDays(defaultEvent);

logEvent(defaultName, defaultEvent);
logTime(defaultName, generalDays);

const eventB = getRandEvent();
const daysB = getTrainingDays(eventB);
const nameB = "Warren";

logEvent(nameB, eventB);
logTime(nameB, daysB);
