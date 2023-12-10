import { logAnswer } from "./logAnswer";
const txtFilePath = "../data/day5.txt";

interface SourceDestinationMap {
  [key: number]: number;
}

const findClosestLocation = (text: string) => {
  const input = text.split("\n").filter((line) => line);
  // split seeds into string[]
  const seeds = input[0].split(": ")[1].split(" ");
  const rest = input.slice(1);

  const mapArrays: string[][][] = [];
  let arrIndexToPushTo = -1;
  let arrToPush: string[][] = [];
  rest.forEach((line, index) => {
    if (line.includes(":")) {
      if (arrToPush.length) {
        mapArrays.push(arrToPush);
      }
      arrIndexToPushTo++;
      arrToPush = [];
    } else {
      arrToPush.push(line.split(" "));
      if (index === rest.length - 1) {
        mapArrays.push(arrToPush);
      }
    }
  });

  // init location[]
  const locations: number[] = [];
  // for each seed, get destination at each map, and push number to location[]
  seeds.forEach((seed) => {
    const seedNum = parseInt(seed);
    const soil = getDestination(seedNum, mapArrays[0]);
    const fert = getDestination(soil, mapArrays[1]);
    const water = getDestination(fert, mapArrays[2]);
    const light = getDestination(water, mapArrays[3]);
    const temp = getDestination(light, mapArrays[4]);
    const humidity = getDestination(temp, mapArrays[5]);
    const location = getDestination(humidity, mapArrays[6]);
    locations.push(location);
  });
  //return the minValue in location[]
  const closestLocation = Math.min(...locations);
  return { locations, closestLocation };
};

function getDestination(source: number, maps: string[][]) {
  let destination = source;
  maps.forEach((map) => {
    const range = parseInt(map[2]);
    const sourceStart = parseInt(map[1]);
    const sourceEnd = sourceStart + range - 1;
    const destinationStart = parseInt(map[0]);
    const diff = source - sourceStart;
    // source is in range, overwrite destination
    if (source >= sourceStart && source <= sourceEnd) {
      destination = destinationStart + diff;
    }
  });
  return destination;
}

// this works but in practice large numbers create a heap out of memory erro --> too  many keys
// function generateSouceDestinationMap(maps: string[][]): SourceDestinationMap {
//   // map looks like: [ [ '50', '98', '2' ], [ '52', '50', '48' ] ]
//   // converts source (ex. seedNumber) -> destination (ex. soilNumber)
//   // { seed1: soil1, seed2: soil2, ...}
//   const sourceToDestinationMap: SourceDestinationMap = {};
//   // console.log("maps", maps);
//   maps.forEach((map) => {
//     const destinationStart = parseInt(map[0]);
//     const sourceStart = parseInt(map[1]);
//     const range = parseInt(map[2]);
//     for (let i = 0; i < range; i++) {
//       sourceToDestinationMap[sourceStart + i] = destinationStart + i;
//     }
//   });
//   return sourceToDestinationMap;
// }

const example = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
// console.log("example: ", findClosestLocation(example));

logAnswer(txtFilePath, findClosestLocation);
