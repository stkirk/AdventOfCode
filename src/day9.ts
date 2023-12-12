import { logAnswer } from "./logAnswer";
const txtFilePath = "../data/day9.txt";

const formatText = (text: string) => {
  const lines = text.split("\n").map((l) => l.split(" ").map((char) => char));
  return lines;
};

const extrapolateSequence = (sequence: string[]): number[][] => {
  let sequenceStack: string[][] = [[...sequence]];
  let i = 0;
  let newSequence: string[] = [];

  while (!sequenceStack[sequenceStack.length - 1].every((val) => val === "0")) {
    const last = sequenceStack[sequenceStack.length - 1];
    const nextNumber = last[i + 1];
    if (nextNumber) {
      newSequence.push((parseInt(nextNumber) - parseInt(last[i])).toString());
      i++;
    } else {
      sequenceStack.push(newSequence);
      newSequence = [];
      i = 0;
    }
  }
  const numberStack = sequenceStack.map((seq) => seq.map((s) => parseInt(s)));
  return numberStack;
};

const getNextNumber = (extrapolation: number[][]): number => {
  const reversedSequence = [...extrapolation].reverse();
  const newSequences: number[][] = [];

  reversedSequence.forEach((sequence, index) => {
    if (index === 0) {
      newSequences.push([...sequence, 0]);
    } else {
      const oldLast = sequence[sequence.length - 1];
      const previous = newSequences[newSequences.length - 1];
      const numberToAdd = previous[previous.length - 1];
      const newLast = oldLast + numberToAdd;
      const next = [...sequence, newLast];
      newSequences.push(next);
    }
  });
  const lastAdded = newSequences[newSequences.length - 1];
  return lastAdded[lastAdded.length - 1];
};

const sumExtrapolatedValues = (text: string) => {
  const sequences = formatText(text);
  const extrapolatedValues: number[] = [];

  // iterate over each sequence and process them
  sequences.forEach((sequence, index) => {
    const extrapolation = extrapolateSequence(sequence);
    // using extrapolated sequence get the next value
    const nextNumberInSequence = getNextNumber(extrapolation);
    extrapolatedValues.push(nextNumberInSequence);
  });

  return extrapolatedValues.reduce((acc, val) => (acc += val), 0);
};

const example = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const ex2 = `13 17 13 -3 -40 -102 -164 -123 310 1846 6098 16480 39771 88673 185787 369538 702699 1284295 2265811 3872783 6433018`;
// console.log(sumExtrapolatedValues(ex2));
// console.log(sumExtrapolatedValues(example));

logAnswer(txtFilePath, sumExtrapolatedValues);
