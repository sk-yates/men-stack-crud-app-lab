// ============================================ Dependencies ============================================

const express = require("express");
const router = express.Router();

const User = require("../models/user.js")
const bcrypt = require("bcrypt");

// ============================================ Handling routes/CRUD element ============================================

router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs")
});

router.post("/sign-up", async (req, res) => {

    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        return res.send(" Username taken! ");
    };

    if (req.body.password !== req.body.confirmPassword) {
        return res.send("Password and Confimation must match!");
    };

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.send(`User created! Welcome ${user.username}`);

});

router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {

    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
        return res.send("Login failed. Please try again!")
    };


    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    );

    if (!validPassword) {
        return res.send("Login failed. Please try something else!")

    };

    req.session.user = {
        username: userInDatabase.username,
        id: userInDatabase._id,
    };

    res.redirect("/");

router.get("/sign-out", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

});























// ============================================ Exporting functions ============================================

module.exports = router;