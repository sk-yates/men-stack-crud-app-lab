const Bat = require("../models/bat.js");

// ============================================ Handling routes/CRUD element ============================================

//* -------------------- Index page --------------------
const indexBats = async (req, res) => {
    const allBats = await Bat.find();
    res.render("bats/index.ejs", { bats: allBats });
};

//* -------------------- Creating a new entry to the index --------------------

const newBat = (req, res) => {
    res.render("bats/new.ejs");
};

const addNewBat = async (req, res) => {
    if (req.body.isInTheCave === "on") {
        req.body.isInTheCave = true;
    } else {
        req.body.isInTheCave = false;
    }
    await Bat.create(req.body);
    res.redirect("/bats");
};

//* -------------------- Viewing an entry in the index --------------------

const viewBat = async (req, res) => {
    const foundBat = await Bat.findById(req.params.batID);
    res.render("bats/show.ejs", { bat: foundBat });
};

const editBat = async (req, res) => {
    const foundBat = await Bat.findById(req.params.batID);
    res.render("bats/edit.ejs", {
      bat: foundBat,
    });
  };

//* -------------------- Editing an entry in the index --------------------

const addEdittedBat = async (req, res) => {
    if (req.body.isInTheCave === "on") {
      req.body.isInTheCave = true;
    } else {
      req.body.isInTheCave = false;
    }
    await Bat.findByIdAndUpdate(req.params.batID, req.body);
    
    res.redirect(`/bats/${req.params.batID}`);
  };

//* -------------------- Deleting an entry in the index --------------------

const deleteBat = async (req, res) => {
    // res.send(`This is a delete route for: ${req.params.batID}`);
    await Bat.findByIdAndDelete(req.params.batID);
    res.redirect("/bats");
  };


// ============================================ Exporting functions ============================================

module.exports = {
    indexBats,
    newBat,
    addNewBat,
    viewBat,
    editBat,
    addEdittedBat,
    deleteBat,

};