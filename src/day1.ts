const fs = require("fs");
const txtFilePath = "../data/input.txt";

// given a text file with string seperated by line breaks, combine the first and last
// number in each string line then add all combined numbers together to get a cummulative
// calibration target
// Part 2 - now include written versions of the numbers 1-9: i.e. 'one' = 1
const sumCalibrationValues = (text) => {
  const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const numberWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const wordNumMap = {};
  numberWords.forEach((word, index) => {
    wordNumMap[word] = (index + 1).toString();
  });

  const newlineStringArr = text.split("\n");
  let sum = 0;
  newlineStringArr.forEach((str) => {
    // init start and end values
    let val1;
    let val2;

    // Initialize variables to keep track of the first and last occurrence
    let firstNumWordIndex = Infinity;
    let firstNumWord;
    let lastNumWordIndex = -1;
    let lastNumWord;

    // Iterate over each numberWord and find the first and last occurrence
    numberWords.forEach((word) => {
      const firstIndex = str.indexOf(word);
      const lastIndex = str.lastIndexOf(word);

      if (firstIndex !== -1 && firstIndex < firstNumWordIndex) {
        firstNumWordIndex = firstIndex;
        firstNumWord = wordNumMap[word];
      }

      if (lastIndex > lastNumWordIndex) {
        lastNumWordIndex = lastIndex;
        lastNumWord = wordNumMap[word];
      }
    });
    console.log("firstNumWordIndex: ", firstNumWordIndex);
    console.log("firstNumWord: ", firstNumWord);
    console.log("lastNumWordIndex: ", lastNumWordIndex);
    console.log("lastNumWord: ", lastNumWord);

    // loop through string forward
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      console.log("CHARRRRR: ", char);
      if (nums.includes(char)) {
        console.log("CHARRRRR: ", char);
        // found a match, if the index is less than firstNumWordIndex use it
        if (i < firstNumWordIndex) {
          console.log("start # =", char, "index:", i);
          // assign value to val1
          val1 = char;
          break;
        }
      } else if (firstNumWordIndex !== Infinity) {
        // num index is greater than word index, use first word val
        console.log("start # =", firstNumWord, "index:", firstNumWordIndex);
        val1 = firstNumWord;
        // break;
      }
    }
    // loop through string backwards
    for (let i = str.length - 1; i >= 0; i--) {
      const char = str[i];
      if (nums.includes(char)) {
        // found last match, if index > lastNumWordIndex use it
        if (i > lastNumWordIndex) {
          console.log("end # =", char, "index:", i);
          // assign value to val2
          val2 = char;
          break;
        }
      } else if (lastNumWordIndex !== -1) {
        // num index is less than word index, use last word val
        console.log("end # =", lastNumWord, "index:", lastNumWordIndex);
        // assign value to val2
        val2 = lastNumWord;
        // break;
      }
    }
    // concat val1 val2, parse to int and add to sum
    console.log(`val1: ${val1}, val2 ${val2}`);
    const combinedVals = parseInt(val1 + val2);
    console.log("combinedVals: ", combinedVals);
    sum += combinedVals;
    console.log("interative sum: ", sum);
    console.log("--------------NEW str------------------");
  });
  return sum;
};

const exampleStr =
  "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";
// const exampleStr =
//   "one1\ntwo2\nthree3\nfour4\nfive5\nsix6\nseven7\neight8\nnine9";
// const exampleStr = "xsftnb6mvgqxv17four";
// console.log(sumCalibrationValues(exampleStr));

fs.readFile(txtFilePath, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(sumCalibrationValues(data));
});
