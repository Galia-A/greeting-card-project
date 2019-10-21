//data
// const fs = require("fs");
const cardsData = require("./cardsData");
const cardContent = require("./cardContent");
// const userData = require('./userData');
const userData = require("./userData");
const User = userData.User;
const passport = require("passport");

const signatures = {
  malePlural: "מאחלים",
  femalePlural: "מאחלות",
  maleSingle: "מאחל",
  femaleSingle: "מאחלת"
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.isActive) {
    next();
  } else {
    res.redirect("/login");
  }
}
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    res.status(403).redirect("/");
  }
}
async function ownsCard(req, res, next) {
  try {
    let card = await cardsData.getOneCard(req.params.id);
    if (card.user._id.equals(req.user._id)) {
      next();
    } else {
      res.status(403).redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.status(404).send(err.toString());
  }
}

function router(app) {
  app
    //  '/' home page
    .get("/", (req, res) => {
      let params = {
        loggedUser: req.user,
        isAdmin: req.user ? req.user.isAdmin : false
      };
      res.render("index.ejs", params);
    })
    //create new card
    .get("/cards/new", isLoggedIn, (req, res) => {
      let params = {
        headline: "יצירת כרטיס ברכה חדש",
        cardData: {},
        signatures: signatures,
        firstName: req.user.firstName,
        isAdmin: req.user.isAdmin
      };
      res.render("newCard.ejs", params);
    })

    //add data to DB & create the card
    .post("/cards", isLoggedIn, (req, res) => {
      let cardForm = req.body.card;
      cardForm.user = req.user._id;
      cardContent
        .createCardContent(cardForm)
        .then(card => {
          userData.addCard(req.user._id, card._id);
          res.redirect(`/cards/${card._id}`);
        })
        .catch(err => console.log(`There was an error: `));
    })
    //show generated card
    .get("/cards/:id", [isLoggedIn, ownsCard], async (req, res) => {
      let params = {
        cardData: await cardsData.getOneCard(req.params.id),
        firstName: req.user.firstName,
        isAdmin: req.user.isAdmin
      };

      res.render("showCard.ejs", params);
    })
    .put("/cards/:id", [isLoggedIn, ownsCard], async (req, res) => {
      // let data = req.body.imgUrl.replace(/^data:image\/png;base64,/, "");
      // let imgUrl = `/userImages/${req.params.id}.png`;
      // fs.writeFileSync(`public/${imgUrl}`, data, {
      //   encoding: "base64"
      // });
      // cardsData.updateFinalImgUrl(req.params.id, req.body.imgUrl, imgUrl);
      cardsData.updateFinalImgUrl(req.params.id, req.body.imgUrl);
      userData.addCard(req.user._id, req.params.id);
    })
    //edit card
    .get("/cards/:id/edit", [isLoggedIn, ownsCard], async (req, res) => {
      let params = {
        cardId: req.params.id,
        cardData: await cardsData.getOneCard(req.params.id),
        headline: "עריכת כרטיס הברכה",
        firstName: req.user.firstName,
        isAdmin: req.user.isAdmin,
        signatures: signatures
      };
      res.render("newCard.ejs", params);
    })

    //edit existing card
    .post("/cards/:id/edit", [isLoggedIn, ownsCard], async (req, res) => {
      let cardId = req.params.id;
      let card = req.body.card;
      card.user = req.user._id;
      //update db
      cardContent
        .createCardContent(card, false, cardId)
        .then(card => {
          console.log("EDIT SUCCESSFUL!");
          res.redirect(`/cards/${card._id}`);
        })
        .catch(err => console.log(`There was an error in update`));
    })
    //user register
    .get("/register", (req, res) => {
      if (req.isAuthenticated()) {
        res.redirect("/");
      } else {
        res.render("register", {
          name: "",
          message: "",
          firstName: "",
          lastName: "",
          email: ""
        });
      }
    })
    .post("/register", (req, res) => {
      //This is for DEV only!
      //TODO - delete on deploy
      req.body.isAdmin = req.body.adminCode === "9876";
      //////////////////////////////////////////////////
      User.register(req.body, req.body.password, (err, user) => {
        if (err) {
          console.log(err);
          res.render("register", {
            name: "UserExistsError",
            message: "שם המשתמש כבר קיים במערכת",
            ...req.body
          });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.redirect("/account");
          });
        }
      });
    })
    //edit user details
    .get("/edit", isLoggedIn, (req, res) => {
      let params = { ...req.user._doc, isAdmin: req.user.isAdmin };
      res.render("editUser", params);
    })
    .post("/edit", isLoggedIn, async (req, res) => {
      //This is for DEV only!
      //TODO - delete on deploy
      if (!req.user.isAdmin) {
        req.body.isAdmin = req.body.adminCode === "9876";
      } else {
        req.body.isAdmin = req.user.isAdmin;
      }
      //////////////////////////////////////////////////
      let user = await User.findByIdAndUpdate(req.user._id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isAdmin: req.body.isAdmin
      });
      if (req.body.password) {
        await user.setPassword(req.body.password);
        await user.save();
      }
      res.redirect("/account");
    })

    //user login
    .get("/login", (req, res) => {
      if (req.isAuthenticated() && req.user.isActive) {
        res.redirect("/");
      } else {
        res.render("login");
      }
    })
    .post(
      "/login",
      passport.authenticate("local", { failureRedirect: "/" }),
      (req, res) => {
        if (!req.user.isActive) {
          req.logout();
        }
        res.redirect("/");
      }
    )
    //user logout
    .get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
    })
    //user account page
    .get("/account", isLoggedIn, async (req, res) => {
      let user = await User.findById(req.user._id)
        .populate("cards")
        .exec();
      res.render("account", user);
    })
    //admin page
    .get("/admin", isAdmin, async (req, res) => {
      let usersDB = await User.find({});

      params = {
        adminId: req.user._id,
        firstName: req.user.firstName,
        isAdmin: req.user.isAdmin,
        usersDB: usersDB
      };
      res.render("admin", params);
    })
    .post("/admin/edit", isAdmin, async (req, res) => {
      let user = await User.findById(req.body.userId);
      if (req.body.isAdmin) {
        user.isAdmin = true;
      } else {
        user.isAdmin = false;
      }
      if (req.body.isActive) {
        user.isActive = true;
      } else {
        user.isActive = false;
      }
      await user.save();

      res.redirect("/admin");
    });
}

module.exports = router;
