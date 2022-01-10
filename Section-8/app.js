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
  name: { type: String, required: true, minlength: 2, maxlength: 150 },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "R",
    category: "-",
    author: "Kashyap Kapdi",
    tags: ["web"],
    isPublished: true,
    price: 20,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (let filed in err.errors) {
      console.log(err.errors[filed].message);
    }
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

createCourse();
