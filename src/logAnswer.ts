import * as fs from "fs";

export const logAnswer = (
  txtFilePath: string,
  callBack: (data: string) => any
) => {
  fs.readFile(txtFilePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("answer: ", callBack(data));
  });
};
