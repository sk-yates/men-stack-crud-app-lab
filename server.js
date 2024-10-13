// ============================================ Dependencies ============================================

// We begin by loading Express
const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose')

const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Bat = require("./models/bat.js");
const BatsCtrl = require("./controllers/bats.js")

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"))


// ============================================ Handling routes/CRUD element ============================================

//* -------------------- Landing page --------------------
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

//* -------------------- Index page --------------------
app.get("/bats", BatsCtrl.indexBats);

//* -------------------- Creating a new entry to the index --------------------
app.get("/bats/new", BatsCtrl.newBat);

app.post("/bats", BatsCtrl.addNewBat);

//* -------------------- Viewing an entry in the index --------------------
app.get("/bats/:batID", BatsCtrl.viewBat);

//* -------------------- Editing an entry in the index --------------------
app.get("/bats/:batID/edit", BatsCtrl.editBat);

app.put("/bats/:batID", BatsCtrl.addEdittedBat);

//* -------------------- Deleting an entry in the index --------------------
app.delete("/bats/:batID", BatsCtrl.deleteBat);













// ============================================ Server link ============================================

app.listen(3000, () => {
  console.log("Listening on port 3000");
});