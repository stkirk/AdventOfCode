import { logAnswer } from "./logAnswer";
const day3Text = "../data/day3.txt";

const notSpecial = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

const digitRegex = /\d/;
function isDigit(char: string) {
  return digitRegex.test(char);
}

const decodeEngineSchematic = (text: string) => {
  const lines = text.split("\n");
  let partNumbersSum = 0;

  // loop through each line
  for (let y = 0; y < lines.length; y++) {
    const currentLine = lines[y];
    // const numbersOnly = currentLine.split(/\D+/).filter((str) => !!str);

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
        const top =
          y === 0
            ? ""
            : lines[y - 1].substring(
                x > 0 ? x - 1 : x,
                x + curNumber.length < currentLine.length
                  ? x + curNumber.length + 1
                  : x + curNumber.length
              );
        const left = currentLine[x - 1] || "";
        const right = currentLine[x + curNumber.length] || "";
        const bottom =
          y === lines.length - 1
            ? ""
            : lines[y + 1].substring(
                x > 0 ? x - 1 : x,
                x + curNumber.length < currentLine.length
                  ? x + curNumber.length + 1
                  : x + curNumber.length
              );
        // console.log(
        //   "numbie",
        //   curNumber,
        //   "top",
        //   top,
        //   "left",
        //   left,
        //   "right",
        //   right,
        //   "bottom",
        //   bottom
        // );
        const allAdjacentCharacters = (top + bottom + left + right).split("");
        let isValidPart = false;
        for (let c = 0; c < allAdjacentCharacters.length; c++) {
          if (!notSpecial.includes(allAdjacentCharacters[c])) {
            isValidPart = true;
          }
        }
        console.log(
          "allAdjacentCharacters",
          curNumber,
          isValidPart,
          allAdjacentCharacters
        );
        if (isValidPart) {
          partNumbersSum += +curNumber;
        }
        curNumber = "";
      }
    }
  }
  return partNumbersSum;
};

const example = `467..114..
69.*....69
3.35..633.
......#...
617*......
.....+.588
..592*....
.....*755*
...$.*...*
.664.598..`;
// console.log("example: ", decodeEngineSchematic(example)); //4361

logAnswer(day3Text, decodeEngineSchematic);
// wrong: 545564, 545443, 504484
