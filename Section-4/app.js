const express = require("express");
const app = express();

let courses = [
  {
    id: 1,
    name: "course - 1",
  },
  {
    id: 2,
    name: "course - 2",
  },
  {
    id: 3,
    name: "course - 3",
  },
];

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/course", (req, res) => {
  res.send([1, 2, 3, 4, 5]);
});

//this code for id params
app.get("/api/course/:id", (req, res) => {
  let course = courses.find((item) => {
    return item.id == parseInt(req.params.id);
  });
  console.log(course);

  if (!course) {
    res.status(404).send("404 - Course not found");
  } else {
    res.send(JSON.stringify(course));
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
