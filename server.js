const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const print = console.log;
const Fruit = require("./models/fruit");
const URI = process.env.MONGODB_URI;

const app = express();
app.use(morgan("dev"));

mongoose.connect(URI);
mongoose.connection.on("connected", () => print(`Connected to MongoDB ${mongoose.connection.name}.`));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => print('Listening on port 3000'));
