const { Int32 } = require("bson");
const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  Class: {
    type: Array,
    required: true,
  },
});

module.exports = Teacher = mongoose.model("Teacher", TeacherSchema);
