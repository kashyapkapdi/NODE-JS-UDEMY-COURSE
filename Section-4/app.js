const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/course", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});

//this code for id params
app.get("/api/course/:id", (req, res) => {
  res.send(req.params.id);
});

// this code for query string
app.get("/api/course/name", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
