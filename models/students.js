const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  // name ,rollno(int),fatherName,phone (int),address,class(int)

  name: {
    type: String,
    // required: true,
  },
  rollNum: {
    type: Number,
    // required: true,
  },
  fatherName: {
    type: String,
    // required: true,
  },
  phoneNum: {
    type: Number,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  Class: {
    type: Number,
    // required: true,
  },
});

module.exports = Student = mongoose.model("Student", StudentSchema);
