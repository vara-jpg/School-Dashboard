const mongoose = require("mongoose");
const config = require("config");

const dburl = config.get("DBURL");

const connectDB = async () => {
  try {
    await mongoose.connect(dburl);
    // mongoose.set("strictQuery", true);
    console.log("db conected ..");
  } catch (err) {
    console.log("err. in db connection .", err);
    process.exit(1);
  }
};

module.exports = connectDB;
