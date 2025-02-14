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
app.use(express.urlencoded({ extended: false }));


mongoose.connect(URI);
mongoose.connection.on("connected", () => print(`Connected to MongoDB ${mongoose.connection.name}.`));

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /fruits
app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  // print(allFruits);
  res.render("fruits/index.ejs", { fruits: allFruits });
});

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

// POST /fruits
app.post("/fruits", async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on";
  await Fruit.create(req.body);
  res.redirect("/fruits");
});

app.listen(3000, () => print('Listening on port 3000'));
