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
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    // name: "React js Course",
    author: "Kashyap Kapdi",
    tags: ["React js", "Frontend"],
    isPublished: true,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getCourses = async () => {
  const courses = await Course.find({ tags: "React js" });

  console.log(courses);
};

const updateCourse = async (id) => {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Prithvi Patel",
        isPublished: false,
      },
    },
    { new: true }
  );

  console.log(course);
};

const removeCourse = async (id) => {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
};

// removeCourse("61dc044d14a68cd556af8e25");

createCourse();
