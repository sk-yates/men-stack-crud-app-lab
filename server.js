// We begin by loading Express
const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose')


const app = express();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Bats = require("./models/bats.js");

app.use(express.urlencoded({ extended: false }));


//* This GET function serves as a place-holder for the landing page
// app.get("/", async (req, res) => {
//   res.send("Welcome, Bat-Nav!");
// });

//* This GET function connects 'index.ejs' via the res.render function
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// app.get("/bats/new", (req, res) => {
//   res.send("This route sends the user a form page!");
// });

app.get("/bats/new", (req, res) => {
  res.render("bats/new.ejs");
});

app.post("/bats", async (req, res) => {
    if (req.body.isLivingInTheCave === "on") {
      req.body.isLivingInTheCave = true;
    } else {
      req.body.isLivingInTheCave = false;
    }
    await Bats.create(req.body);
  res.redirect("/bats/new");
});









app.listen(3000, () => {
  console.log("Listening on port 3000");
});