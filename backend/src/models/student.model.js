const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  rollNumber: {
    type: String,
    required: true,
    // unique: true, // Uncomment if roll numbers are unique
    trim: true,
  },

  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },

  department: {
    type: String,
    required: true,
    enum: ["CSE", "ECE", "EEE", "ME", "CE", "IT"], // customize for your college
  },

  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },

  batch: {
    type: String, // Example: "2023-2027" give options
    required: true,
  },

  section: {
    type: String, // Example: "A" / "B"
    required: true,
  },

  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      courseCode: String,
      courseName: String,
    },
  ],

  attendance: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      totalClasses: { type: Number, default: 0 },
      attendedClasses: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
    },
  ],

  role: {
    type: String,
    enum: ["STUDENT","ADMIN","FACULTY"],
    default: "STUDENT",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
