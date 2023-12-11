import { logAnswer } from "./logAnswer";
const txtFilePath = "../data/day8.txt";

interface Step {
  left: string;
  right: string;
  value: string;
}

class Node {
  data: string;
  next: Node | null;
  constructor(data: string) {
    this.data = data;
    this.next = null;
  }
}

class CircularLinkedList {
  head: Node | null;

  constructor() {
    this.head = null;
  }

  append(data: string) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      // start at head and traverse
      let current = this.head;
      // keep going until current.next is head, means we're on current lastNode
      while (current!.next !== this.head) {
        current = current!.next!;
      }
      // reassing next from head to appended node
      current!.next = newNode;
      // appended node is now last, cicle it back to head
      newNode.next = this.head;
    }
  }
}

function stringToCircularLinkedList(inputString: string): CircularLinkedList {
  const linkedList = new CircularLinkedList();
  for (let char of inputString) {
    linkedList.append(char);
  }
  return linkedList;
}

const formatText = (text: string) => {
  const lines = text.split("\n").filter((l) => l);
  const directionSequence = lines[0];
  // get keys and left rights into an object of objects
  const nodeMap: { [key: string]: Step } = {};
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const key = line.split(" = ")[0];
    const direction = line
      .split("(")[1]
      .split(", ")
      .map((str) => str.substring(0, 3));
    nodeMap[key] = { left: direction[0], right: direction[1], value: key };
  }
  return { directionSequence, nodeMap };
};

const getStepsToZZZ = (text: string) => {
  const { directionSequence, nodeMap } = formatText(text);
  const loopedDirections = stringToCircularLinkedList(directionSequence);
  const startNode = nodeMap["AAA"];
  const finishStepValue = nodeMap["ZZZ"].value;

  let currentDirectionNode = loopedDirections.head;
  let currentStep = nodeMap["AAA"];
  let steps = 0;

  while (currentStep.value !== finishStepValue) {
    // take a step
    if (currentDirectionNode?.data === "L") {
      // lookup currentStep.left
      const leftStep = nodeMap[currentStep.left];
      // move currentStep left
      currentStep = leftStep;
    } else {
      // currentDirectionNode?.data points to "R"
      const rightStep = nodeMap[currentStep.right];
      currentStep = rightStep;
    }
    // increase step counter
    steps += 1;
    // check if destination is finishStepValue
    if (currentStep.value === finishStepValue) {
      return steps;
    }
    // set next direction for next step
    currentDirectionNode = currentDirectionNode!.next;
  }
};
const example = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

// console.log(getStepsToZZZ(example));

logAnswer(txtFilePath, getStepsToZZZ);
