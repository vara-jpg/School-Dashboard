const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const Admin = require("../../models/admin");
const router = express.Router();

router.get("/", (req, res) => res.send("hoila"));

const key = config.get("JwtKey");

router.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 3 or more characters"
  ).isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      const response = await Admin.findOne({ email });
      if (response) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const salt = await bcrypt.genSalt(10);
      const cur = new Admin({
        name,
        email,
        password,
      });
      cur.password = await bcrypt.hash(password, salt);
      await cur.save();

      const pay = {
        user: {
          id: cur.id,
        },
      };

      jwt.sign(pay, key, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 3 or more characters"
  ).isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("hello ", email);
    try {
      const response = await Admin.findOne({ email });
      if (!response) {
        console.log("no match for credits");
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, response.password);

      if (!isMatch) {
        console.log("no match for credits");
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const pay = {
        user: {
          id: response._id,
        },
      };

      jwt.sign(pay, key, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log("err == ", err);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
