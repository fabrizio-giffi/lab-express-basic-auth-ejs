const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { isLoggedOut } = require("../middleware/route-guard");
const User = require("../models/User.model");

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut, async (req, res) => {
  const body = req.body;
  if (body.password.length < 6) {
    res.render("auth/signup", {
      error: "Password too short, minimum 6 characters are required.",
      body: req.body,
    });
  } else {
    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(body.password, salt);

    delete body.password;

    const newUser = { ...body, passwordHash: passwordHash };

    try {
      await User.create(newUser);
      res.render("profile", { user: newUser });
    } catch (error) {
      if (error.code === 11000) {
        res.render("auth/signup", {
          error: "Username or email already used!",
          body: req.body,
        });
      }
    }
  }
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, async (req, res) => {
  const userCheck = await User.find({ username: req.body.username });
  if (!userCheck.length) {
    res.render("auth/login", { error: "There was an error with the login." });
  } else {
    const user = userCheck[0];
    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const tempUser = {
        username: user.username,
        email: user.email,
        pet: user.pet,
      };
      req.session.user = tempUser;
      res.redirect("/profile");
    } else {
      res.render("auth/login", { error: "There was an error with the login." });
    }
  }
});

router.get("/logout", (req, res) => {
  delete req.session.user;
  res.redirect("/auth/login");
});

module.exports = router;
