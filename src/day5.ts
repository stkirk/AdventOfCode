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
  // console.log("mapArrays", mapArrays);
  // convert each map into string[][]
  // then pass into generateSouceDestinationMap to get maps
  //seed-to-soil
  const seedToSoilMap = generateSouceDestinationMap(mapArrays[0]);
  // soil-to-fert
  const soilToFertMap = generateSouceDestinationMap(mapArrays[1]);
  // fert-to-water
  const fertToWaterMap = generateSouceDestinationMap(mapArrays[2]);
  // water-to-light
  const waterToLightMap = generateSouceDestinationMap(mapArrays[3]);
  // light-to-temp
  const lightToTempMap = generateSouceDestinationMap(mapArrays[4]);
  // temp-to-humidity
  const tempToHumidity = generateSouceDestinationMap(mapArrays[5]);
  // humidity-to-location
  const humidityToLocation = generateSouceDestinationMap(mapArrays[6]);
  // init location[]
  const locations: number[] = [];
  // for each seed, lookup location by converting through each map, and push number to location[]
  seeds.forEach((seed) => {
    const seedNum = parseInt(seed);
    const soil = seedToSoilMap[seedNum] || seedNum;
    const fert = soilToFertMap[soil] || soil;
    const water = fertToWaterMap[fert] || fert;
    const light = waterToLightMap[water] || water;
    const temp = lightToTempMap[light] || light;
    const humidity = tempToHumidity[temp] || temp;
    const location = humidityToLocation[humidity] || humidity;
    locations.push(location);
  });
  //return the minValue in location[]
  const closestLocation = Math.min(...locations);
  return { locations, closestLocation };
};

function generateSouceDestinationMap(maps: string[][]): SourceDestinationMap {
  // map looks like: [ [ '50', '98', '2' ], [ '52', '50', '48' ] ]
  // converts source (ex. seedNumber) -> destination (ex. soilNumber)
  // { seed1: soil1, seed2: soil2, ...}
  const sourceToDestinationMap: SourceDestinationMap = {};
  // console.log("maps", maps);
  maps.forEach((map) => {
    const destinationStart = parseInt(map[0]);
    const sourceStart = parseInt(map[1]);
    const range = parseInt(map[2]);
    for (let i = 0; i < range; i++) {
      sourceToDestinationMap[sourceStart + i] = destinationStart + i;
    }
  });
  return sourceToDestinationMap;
}

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
console.log("example: ", findClosestLocation(example));

// logAnswer(txtFilePath, findClosestLocation);
