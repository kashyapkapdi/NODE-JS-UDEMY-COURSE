const fs = require("fs");

const files = fs.readdirSync("./");

console.log(files);

const filesAsync = fs.readdirSync("./", function (err, files) {
  console.log(files);
});

console.log(filesAsync);
