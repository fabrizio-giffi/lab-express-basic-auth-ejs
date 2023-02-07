// checks if the user is logged in when trying to access a specific page

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  next();
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page

const isLoggedOut = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
};

// Users with value different than cat in pet property are not allowed to proceed
const isCatPerson = (req, res, next) => {
    if (req.session.user.pet !== "cat") {
        return res.redirect("/")
    }
    next();
}

// Users with username different than Fabrizio are not allowed to proceed
const isFabrizio = (req, res, next) => {
    if (req.session.user.username !== "Fabrizio") {
      return res.redirect("/");
    }
    next();
}

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isFabrizio,
  isCatPerson,
};
