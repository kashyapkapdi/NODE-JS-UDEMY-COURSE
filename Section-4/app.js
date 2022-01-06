const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/data", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
