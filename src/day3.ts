import { logAnswer } from "./logAnswer";
const day3Text = "../data/day3.txt";

interface GearLocations {
  [key: string]: number[];
}

const notSpecial = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const digitRegex = /\d/;
function isDigit(char: string) {
  return digitRegex.test(char);
}

const decodeEngineSchematic = (text: string) => {
  const lines = text.split("\n");
  let partNumbersSum = 0;
  let gearRatioSum = 0;

  const gearLocationMap: GearLocations = {};
  const mapGears = (
    xStart: number,
    xEnd: number,
    line: number | undefined,
    curNum: string
  ) => {
    if (!line) {
      return;
    }
    for (let i = xStart; i < xEnd; i++) {
      const curChar = lines[line][i];
      const location = `${line}, ${i}`;
      if (curChar === "*") {
        console.log(curNum, "* location", location);
        if (!gearLocationMap[location]) {
          // init location in map
          gearLocationMap[location] = [parseInt(curNum)];
        } else {
          gearLocationMap[location].push(parseInt(curNum));
        }
      }
    }
  };

  // loop through each line
  for (let y = 0; y < lines.length; y++) {
    const currentLine = lines[y];

    let curNumber = "";
    // loop through each char and identify a number along with its coordinates
    for (let x = 0; x < currentLine.length; x++) {
      // traverse the line until a digit is found
      if (isDigit(currentLine[x]) && !isDigit(currentLine[x - 1])) {
        // keep traversing and appending digits to curNumber until a non digit end index is found
        let numIndex = x;
        while (isDigit(currentLine[numIndex])) {
          curNumber += currentLine[numIndex];
          numIndex += 1;
        }
        // check substrings all around the span of curNumber
        const topBottomStartX = x > 0 ? x - 1 : x;
        const topBottomEndX =
          x + curNumber.length < currentLine.length // non inclusive last char use < in loop
            ? x + curNumber.length + 1
            : x + curNumber.length;
        const leftX = x - 1;
        const rightX = x + curNumber.length;
        const top =
          y === 0 ? "" : lines[y - 1].substring(topBottomStartX, topBottomEndX);
        const left = currentLine[leftX] || "";
        const right = currentLine[rightX] || "";
        const bottom =
          y === lines.length - 1
            ? ""
            : lines[y + 1].substring(topBottomStartX, topBottomEndX);

        const allAdjacentCharacters = (top + bottom + left + right).split("");
        let isValidPart = false;
        for (let c = 0; c < allAdjacentCharacters.length; c++) {
          if (!notSpecial.includes(allAdjacentCharacters[c])) {
            isValidPart = true;
          }
        }
        // map top
        mapGears(
          topBottomStartX,
          topBottomEndX,
          y === 0 ? undefined : y - 1,
          curNumber
        );
        // map bottom
        mapGears(
          topBottomStartX,
          topBottomEndX,
          y === lines.length - 1 ? undefined : y + 1,
          curNumber
        );
        // map left
        mapGears(leftX, leftX + 1, y, curNumber);
        // map right
        mapGears(rightX, rightX + 1, y, curNumber);
        if (isValidPart) {
          partNumbersSum += +curNumber;
        }
        curNumber = "";
      }
    }
  }
  console.log("gearLocationMap:", Object.values(gearLocationMap));
  Object.values(gearLocationMap).forEach((numArr) => {
    if (numArr.length === 2) {
      // found a gear, multiply them and add to sum
      gearRatioSum += numArr[0] * numArr[1];
    }
  });

  return { partNumbersSum, gearRatioSum };
};

const example = `467..114..
...*......
..35..633*
*.....#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
// console.log("example: ", decodeEngineSchematic(example)); //4361

logAnswer(day3Text, decodeEngineSchematic); //546312
