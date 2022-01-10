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

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/course/:id", (req, res) => {
  let course = courses.find((item) => item.id == parseInt(req.params.id));
  if (!course) res.status(404).send("404 - Course not found");

  res.send(JSON.stringify(course));
});

app.post("/api/courses", (req, res) => {
  let { error } = validateCourse(req.body);

  if (error) {
    // 400 Bad request
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  app.get("/", (req, res) => res.send("Hello World!"));
  

  courses.push(course);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  let course = courses.find((item) => item.id == parseInt(req.params.id));
  if (!course) res.status(404).send("404 - Course not found");

  let { error } = validateCourse(req.body);

  if (error) {
    // 400 Bad request
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/delete/:id", (req, res) => {
  let course = courses.find((item) => item.id == parseInt(req.params.id));
  if (!course) res.status(404).send("404 - Course not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});

const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
