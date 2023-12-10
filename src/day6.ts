import { logAnswer } from "./logAnswer";
const txtFilePath = "../data/day6.txt";

type Race = {
  lengthOfTime: number;
  recordDistance: number;
};

const parseRaceText = (text: string) => {
  const [times, distances] = text
    .split("\n")
    .map((line) => line.split(" ").filter((line) => line));

  const races: Race[] = [];

  for (let i = 1; i < times.length; i++) {
    const newRace = {
      lengthOfTime: parseInt(times[i]),
      recordDistance: parseInt(distances[i]),
    };
    races.push(newRace);
  }
  return races;
};

const combineRaces = (races: Race[]): Race[] => {
  let totalTime = "";
  let totalDistance = "";
  races.forEach((race) => {
    totalTime += race.lengthOfTime.toString();
    totalDistance += race.recordDistance.toString();
  });
  return [
    {
      lengthOfTime: parseInt(totalTime),
      recordDistance: parseInt(totalDistance),
    },
  ];
};

const calculateWaysToWin = (text: string) => {
  const races: Race[] = parseRaceText(text);
  const combinedRaces: Race[] = combineRaces(races);
  const winningWays = Array(races.length).fill(0);
  const winningWay = Array(combinedRaces.length).fill(0);
  // iterate over races, and calculate ways to win
  races.forEach((race, index) => {
    let timeRemaining = race.lengthOfTime;
    // uncharged boat start speed
    let speed = 0; // mm/ms
    for (let i = 0; i <= race.lengthOfTime; i++) {
      const timeElapsed = i;
      const distanceTraveled = speed * timeRemaining;
      const isWinningWay = distanceTraveled > race.recordDistance;
      if (isWinningWay) {
        winningWays[index] += 1;
      }
      speed += 1;
      timeRemaining -= 1;
      if (winningWays[index] > 0 && !isWinningWay) {
        break;
      }
    }
  });
  // Part 2
  combinedRaces.forEach((race, index) => {
    let timeRemaining = race.lengthOfTime;
    // uncharged boat start speed
    let speed = 0; // mm/ms
    for (let i = 0; i <= race.lengthOfTime; i++) {
      const timeElapsed = i;
      const distanceTraveled = speed * timeRemaining;
      const isWinningWay = distanceTraveled > race.recordDistance;
      if (isWinningWay) {
        winningWay[index] += 1;
      }
      speed += 1;
      timeRemaining -= 1;
      console.log("timeRemaining: ", timeRemaining);
      if (winningWay[index] > 0 && !isWinningWay) {
        break;
      }
    }
  });
  const productOfWinningWays = winningWays.reduce((acc, cur) => acc * cur, 1);
  return { winningWays, productOfWinningWays, winningWay };
};

const example = `Time:      7  15   30
Distance:  9  40  200`;
// console.log(calculateWaysToWin(example));

logAnswer(txtFilePath, calculateWaysToWin); //2374848
