import { logAnswer } from "./logAnswer";
const day4Text = "../data/day4.txt";

const getWinCount = (numberList: string[][]) => {
  let winCount = 0;
  const winners = numberList[0];
  const myNumbers = numberList[1];
  winners.forEach((winner) => {
    if (myNumbers.includes(winner)) {
      winCount += 1;
    }
  });
  return winCount;
};

const sumScratchCardPoints = (text: string) => {
  const textLines = text.split("\n");
  // init hashMap with index + 1 to id Card # as key and numbersList as value
  // ex {1: [[41, 48, 52, ...], [83, 86, 6 ...]], 2: [[99], [5]]...}
  const cardMap: any = {};
  // split each line into two arrays, winners and myNumbers
  // const arr = [[['1', '2', '3'], ['4', '5', '6'], 1], [['7', '8', '9'], ['a', 'b', 'c'], 2]]
  const numbersList = textLines.map((line, index) => {
    const newList: any[] = line
      .split(":")[1]
      .split("|")
      .map((l) => l.split(" ").filter((str) => !!str));
    // add to cardMap
    newList.push(index + 1);
    cardMap[index + 1] = [...newList];
    // console.log("newList: ", newList);
    return newList;
  });
  // console.log("cardMap", cardMap);
  // console.log("numbersList", numbersList);
  // let totalCards = numbersList.length;
  // const totalList = [...numbersList];
  // while (totalList.length) {
  //   console.log("totalList length: ", totalList.length);
  //   console.log("totalCards: ", totalCards);
  //   const curCard = totalList[0];
  //   const curWins = getWinCount(curCard);
  //   totalCards += curWins;
  //   if (curWins > 0) {
  //     // add appropriate cards to totalList
  //     const cardNumber = curCard[2];
  //     for (let i = cardNumber + 1; i <= cardNumber + curWins; i++) {
  //       if (cardMap[i]) {
  //         totalList.push(cardMap[i]);
  //       }
  //     }
  //   }
  //   // shift totalList
  //   totalList.shift();
  // }
  // console.log("totalCards: ", totalCards);
  // calculate amount of winners for each Card
  let totalPoints = 0;
  let cardTotals = Array(numbersList.length).fill(1);
  numbersList.forEach((numberList, index) => {
    const winCount = getWinCount(numberList);
    // console.log("winCount", winCount);
    let cardPoints = 0;
    if (winCount > 0) {
      // calculate worth of card and add to totalPoints
      cardPoints = Math.pow(2, winCount - 1);
    }
    // console.log("cardPoints", cardPoints);
    totalPoints += cardPoints;
    // add to cardTotals for cards starting at index + 1
    for (let i = index + 1; i <= index + winCount; i++) {
      cardTotals[i] += cardTotals[index];
    }
  });
  return [totalPoints, cardTotals.reduce((acc, cur) => acc + cur, 0)];
};

const ex4 = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

// console.log("ex4", sumScratchCardPoints(ex4));

logAnswer(day4Text, sumScratchCardPoints); //9,721,255 9,721,255
