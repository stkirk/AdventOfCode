import { logAnswer } from "./logAnswer";
const txtFilePath = "../data/day7.txt";

const handTypes = {
  fiveOfAKind: 6,
  fourOfaKind: 5,
  fullHouse: 4,
  threeOfAKind: 3,
  twoPair: 2,
  onePair: 1,
  highCard: 0,
} as const;

const cardScores: { [key: string]: number } = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  T: 8,
  J: -1,
  Q: 10,
  K: 11,
  A: 12,
};

type HandType = number;

interface Hand {
  bid: number;
  hand: string[];
  handType: HandType;
  originalCardOrder: string;
}

const getInitialHandType = (
  quints: number,
  quads: number,
  triples: number,
  pairs: number
) => {
  let handType: HandType = handTypes.highCard;
  if (quints > 0) {
    return handTypes.fiveOfAKind;
  } else if (quads > 0) {
    return handTypes.fourOfaKind;
  } else if (triples > 0) {
    if (pairs > 0) {
      return handTypes.fullHouse;
    }
    return handTypes.threeOfAKind;
  } else if (pairs > 0) {
    return pairs === 2 ? handTypes.twoPair : handTypes.onePair;
  }
  return handType;
};

const getHandType = (orderedHand: string[]): HandType => {
  let pairs = 0;
  let triples = 0;
  let quads = 0;
  let quints = 0;
  const wildsArr = orderedHand.filter((cardBundle) => cardBundle.includes("J"));
  const wilds = wildsArr[0] ?? "";
  const noWilds = orderedHand.filter((cardBundle) => !cardBundle.includes("J"));

  noWilds.forEach((cardBundle) => {
    if (cardBundle.length === 2) {
      pairs += 1;
    } else if (cardBundle.length === 3) {
      triples += 1;
    } else if (cardBundle.length === 4) {
      quads += 1;
    } else if (cardBundle.length === 5) {
      quints += 1;
    }
  });
  const handTypeNoWilds = getInitialHandType(quints, quads, triples, pairs);
  // skipping full house, can't have one and Jokers
  if (wilds.length === 5) {
    return handTypes.fiveOfAKind;
  }
  if (handTypeNoWilds === handTypes.fourOfaKind) {
    return wilds.length ? handTypes.fiveOfAKind : handTypeNoWilds;
  } else if (handTypeNoWilds === handTypes.threeOfAKind) {
    if (wilds.length === 2) {
      return handTypes.fiveOfAKind;
    } else if (wilds.length === 1) {
      return handTypes.fourOfaKind;
    } else {
      return handTypeNoWilds;
    }
  } else if (handTypeNoWilds === handTypes.twoPair) {
    return wilds.length ? handTypes.fullHouse : handTypeNoWilds;
  } else if (handTypeNoWilds === handTypes.onePair) {
    if (wilds.length === 3) {
      return handTypes.fiveOfAKind;
    } else if (wilds.length === 2) {
      return handTypes.fourOfaKind;
    } else if (wilds.length === 1) {
      return handTypes.threeOfAKind;
    } else {
      return handTypeNoWilds;
    }
  } else if (handTypeNoWilds === handTypes.highCard) {
    if (wilds.length === 4) {
      return handTypes.fiveOfAKind;
    } else if (wilds.length === 3) {
      return handTypes.fourOfaKind;
    } else if (wilds.length === 2) {
      return handTypes.threeOfAKind;
    } else if (wilds.length === 1) {
      return handTypes.onePair;
    } else {
      return handTypeNoWilds;
    }
  }
  return handTypeNoWilds;
};

const formatHands = (text: string): Hand[] => {
  const hands = text.split("\n").map((hand) => hand.split(" "));
  const formattedHands = hands.map((hand) => {
    const curHand = hand[0].split("");
    const cardOccurenceMap: { [key: string]: number } = {};
    curHand.forEach((card) => {
      if (!cardOccurenceMap[card]) {
        cardOccurenceMap[card] = 1;
      } else {
        cardOccurenceMap[card] += 1;
      }
    });
    const orderedHand = Object.keys(cardOccurenceMap).map((card) => {
      let likeCards = "";
      for (let i = 0; i < cardOccurenceMap[card]; i++) {
        likeCards += card;
      }
      return likeCards;
    });
    const formattedHand: Hand = {
      bid: parseInt(hand[1]),
      hand: orderedHand,
      handType: getHandType(orderedHand),
      originalCardOrder: hand[0],
    };
    return formattedHand;
  });
  return formattedHands;
};

const calculateWinnings = (text: string) => {
  const hands = formatHands(text);
  const sortedHands = hands.sort((a, b) => {
    const handComparison = a.handType - b.handType;
    if (handComparison !== 0) {
      return handComparison;
    }
    for (let i = 0; i < a.originalCardOrder.length; i++) {
      const aCard = a.originalCardOrder[i];
      const bCard = b.originalCardOrder[i];
      const cardCompare = cardScores[aCard] - cardScores[bCard];
      if (cardCompare !== 0) {
        return cardCompare;
      }
    }
    // failsafe return last card comparison?
    const lastACard =
      cardScores[a.originalCardOrder[a.originalCardOrder.length - 1]];
    const lastBCard =
      cardScores[b.originalCardOrder[b.originalCardOrder.length - 1]];
    return lastACard - lastBCard;
  });
  // calculate the total price
  const totalPrize = sortedHands.reduce((acc, hand, index) => {
    const rank = index + 1;
    return (acc += hand.bid * rank);
  }, 0);
  return totalPrize;
};

const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

// console.log(calculateWinnings(example));

logAnswer(txtFilePath, calculateWinnings);
