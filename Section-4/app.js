const express = require("express");
const app = express();
let Joi = require("joi");
app.use(express.json());

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

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    // 400 Bad request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
