const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const print = console.log;
const Fruit = require("./models/fruit");
const URI = process.env.MONGODB_URI;

const app = express();
app.use(morgan("dev"));
app.use(methodOverride("_method"));
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

// GET /fruits/id/edit
app.get("/fruits/:id/edit", async (req, res) => {
  const fruit = await Fruit.findById(req.params.id);
  res.render("fruits/edit.ejs", { fruit });
});

// GET /fruits/id
app.get("/fruits/:id", async (req, res) => {
  const fruit = await Fruit.findById(req.params.id);
  res.render("fruits/show.ejs", { fruit });
});

// POST /fruits
app.post("/fruits", async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on";
  await Fruit.create(req.body);
  res.redirect("fruits");
});

// DELETE /fruits/id
app.delete("/fruits/:id", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.id);
  res.redirect("/fruits");
});

// PUT /fruits/id
app.put("/fruits/:id", async (req, res) => {
  req.body.isReadyToEat = req.body.isReadyToEat === "on";
  await Fruit.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/fruits/${req.params.id}`);
})

app.listen(3000, () => print('Listening on port 3000'));
