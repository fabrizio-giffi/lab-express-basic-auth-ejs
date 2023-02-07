const router = require("express").Router();
const { isLoggedIn, isFabrizio, isCatPerson } = require("../middleware/route-guard");


router.get("/", (req, res, next) => {
  res.render("index", { user: req.session.user });
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { user: req.session.user});
});

router.get("/main", isLoggedIn, isCatPerson, (req, res) =>{
  const imgUrl = "https://hips.hearstapps.com/hmg-prod/images/womanyellingcat-1573233850.jpg"
  res.render("main", { user: req.session.user, imgUrl })
})

router.get("/private", isLoggedIn, isFabrizio, (req, res) =>{
  console.log(req.session.user.username)
  res.render("private", { user: req.session.user })
})


module.exports = router;
