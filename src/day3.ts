import { logAnswer } from "./logAnswer";
const day3Text = "../data/day3.txt";

interface FalseOnly {
  [key: string]: string[];
}

// const specialCharRegex = /[^0-9.]/g;
const notSpecialChar = /^[a-zA-Z0-9.]$/;

function isSpecialCharacter(char: string) {
  // return specialCharRegex.test(char);
  return !notSpecialChar.test(char);
}

const decodeEngineSchematic = (text: string) => {
  const schematicLines = text.split("\n");
  let partNumbersSum = 0;
  const falseOnly: FalseOnly = {};

  for (let i = 0; i < schematicLines.length; i++) {
    const currentLine = schematicLines[i];

    const numbersOnly = currentLine.split(/\D+/).filter((str) => !!str);

    if (!numbersOnly.length) {
      continue;
    }
    numbersOnly.forEach((number) => {
      const curStartIndex = currentLine.indexOf(number);
      const charsToValidate = [];
      for (let j = curStartIndex; j < curStartIndex + number.length; j++) {
        const isPreviousCharacter = j !== 0;
        const isNextCharacter = j < currentLine.length - 1;
        const isPreviousLine = i !== 0;
        const isNextLine = i < schematicLines.length - 1;
        if (isPreviousCharacter) {
          const prevChar = currentLine[j - 1];
          charsToValidate.push(prevChar);
        }
        if (isPreviousCharacter && isPreviousLine) {
          const prevLeftChar = schematicLines[i - 1][j - 1];
          charsToValidate.push(prevLeftChar);
        }
        if (isPreviousLine) {
          const prevTop = schematicLines[i - 1][j];
          charsToValidate.push(prevTop);
        }
        if (isPreviousLine && isNextCharacter) {
          const prevRight = schematicLines[i - 1][j + 1];
          charsToValidate.push(prevRight);
        }
        if (isNextCharacter) {
          const nextChar = currentLine[j + 1];
          charsToValidate.push(nextChar);
        }
        if (isNextLine && isNextCharacter) {
          const nextRight = schematicLines[i + 1][j + 1];
          charsToValidate.push(nextRight);
        }
        if (isNextLine) {
          const nextBottom = schematicLines[i + 1][j];
          charsToValidate.push(nextBottom);
        }
        if (isNextLine && isPreviousCharacter) {
          const nextLeft = schematicLines[i + 1][j - 1];
          charsToValidate.push(nextLeft);
        }
      }
      const isValidPartNumber = charsToValidate.some((char) =>
        isSpecialCharacter(char)
      );
      // console.log(
      //   `charsToValidate ${number}, add? ${isValidPartNumber}: `,
      //   charsToValidate
      // );
      if (isValidPartNumber) {
        partNumbersSum += parseInt(number);
      } else {
        falseOnly[number] = charsToValidate.filter((char) => char !== ".");
      }
    });
  }
  console.log(falseOnly);
  return partNumbersSum;
};

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+..58
..592.....
......755.
..$..*&^%*
664...!598`;
// console.log("example: ", decodeEngineSchematic(example)); //4361

logAnswer(day3Text, decodeEngineSchematic);
