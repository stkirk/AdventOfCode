const fs = require("fs");

const logAnswer = (txtFilePath, callBack) => {
  fs.readFile(txtFilePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("answer: ", callBack(data));
  });
};

module.exports = logAnswer;
