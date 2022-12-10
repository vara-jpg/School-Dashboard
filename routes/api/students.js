const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const students = require("../../models/students");

const Student = require("../../models/students");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    let resp = await Student.find();
    res.json(resp);
  } catch (err) {
    console.log("error fetching students ", err);
    return res.send("error in geting students");
  }
});

router.post(
  "/",
  [
    check("name", "Please include a name").notEmpty(),
    check("rollNum", "Please include a Roll Number").notEmpty(),
    check("fatherName", "Please include a Father Name").notEmpty(),
    check("phoneNum", "Please include a Phone Number").notEmpty(),
    check("address", "Please include a Adress").notEmpty(),
    check("Class", "Please include a Class type").notEmpty(),
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, rollNum, fatherName, phoneNum, address, Class } = req.body;
    const temp = {
      name: name ? name : "",
      rollNum: rollNum ? rollNum : "",
      fatherName: fatherName ? fatherName : "",
      phoneNum: phoneNum ? phoneNum : "",
      address: address ? address : "",
      Class: Class ? Class : "",
    };

    try {
      const cur = new Student(temp);
      await cur.save();
      return res.json(cur);
    } catch (err) {
      console.log("error aading  students ", err);
      return res.status(500).send("error in adding students");
    }
  }
);
router.post("/:id", auth, async (req, res) => {
  const { name, rollNum, fatherName, phoneNum, address, Class } = req.body;
  const temp = {};
  if (name) temp.name = name;
  if (rollNum) temp.rollNum = rollNum;
  if (fatherName) temp.fatherName = fatherName;
  if (phoneNum) temp.phoneNum = phoneNum;
  if (address) temp.address = address;
  if (Class) temp.Class = Class;

  const id = req.params.id;

  let ans = mongoose.isValidObjectId(id);
  console.log(ans);

  try {
    let response = await Student.findById(id);

    if (response) {
      response = await Student.findOneAndUpdate(
        { user_id: id },
        { $set: temp },
        { new: true }
      );
      return res.json(response);
    }
    console.log("not found");
    return res.send("bad request").status(400);
  } catch (err) {
    console.log("error posting  students ", err);
    return res.status(500).send("error in posting students");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    let resp = await Student.findById(id);
    if (!resp) {
      return res.status(400).send("No User Found ");
    }
    await resp.remove();
    resp = await Student.find();
    return res.json(resp);
  } catch (err) {
    console.log("error deleting students ", err);
    return res.status(500).send("error in deleting students");
  }
});

module.exports = router;
