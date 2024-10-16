// ============================================ Dependencies ============================================


const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

const port = process.env.PORT ? process.env.PORT : 3000;

const authController = require("./controllers/auth.js")


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const BatsCtrl = require("./controllers/bats.js");


// ============================================ Middleware ============================================

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// ============================================ Handling routes/CRUD element ============================================


//* -------------------- Landing page --------------------
app.get("/", async (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.use("/auth", authController);

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

app.listen(port, () => {
  console.log(`Express app listening on port: ${port}!`);
});