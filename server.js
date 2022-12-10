const express = require("express");
const cors = require("cors");
const connectDb = require("./db");

const app = express();

const port = 5000 || process.env.PORT;

connectDb();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("api is up and running "));

app.use("/api/students", require("./routes/api/students"));
app.use("/api/teachers", require("./routes/api/teachers"));
app.use("/api/auth", require("./routes/api/auth"));
app.listen(port, () => console.log("app started ... "));
