const express = require("express");
const mongoose = require("mongoose");
const PORT = 5001;

let app = express();

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("Connected to MongoDB..");

    app.listen(PORT, () => {
      console.log(`Serve is running on port number: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Could not connected to mongoDB ${err}`);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "React js Course",
    author: "Kashyap Kapdi",
    tags: ["React js", "Frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
};

createCourse();
