//data
const fs = require("fs");
const cardsData = require("./cardsData");
const cardContent = require("./cardContent");
// const userData = require('./userData');
const userData = require("./userData");
const User = userData.User;
const passport = require("passport");

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
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

function router(app) {
  app
    //  '/' home page
    .get("/", (req, res) => {
      let params = { loggedUser: req.user };
      res.render("homepage.ejs", params);
    })
    //create new card
    .get("/cards/new", isLoggedIn, (req, res) => {
      let params = {
        headline: "יצירת כרטיס ברכה חדש",
        cardData: {}
      };
      res.render("newCard.ejs", params);
    })

    //add data to DB & create the card
    .post("/cards", isLoggedIn, (req, res) => {
      let card = req.body.card;
      card.user = req.user._id;
      cardContent
        .createCardContent(card)
        .then(card => {
          res.redirect(`/cards/${card._id}`);
        })
        .catch(err => console.log(`There was an error: `));
    })
    //show generated card
    .get("/cards/:id", isLoggedIn, async (req, res) => {
      let params = {
        cardData: await cardsData.getOneCard(req.params.id)
      };

      res.render("showCard.ejs", params);
    })
    .put("/cards/:id", isLoggedIn, async (req, res) => {
      let data = req.body.imgUrl.replace(/^data:image\/png;base64,/, "");
      let imgUrl = `/userImages/${req.params.id}.png`;
      fs.writeFileSync(`public/${imgUrl}`, data, {
        encoding: "base64"
      });
      cardsData.updateFinalImgUrl(req.params.id, req.body.imgUrl, imgUrl);
      userData.addCard(req.user._id, req.params.id);
    })
    //edit card
    .get("/cards/:id/edit", isLoggedIn, async (req, res) => {
      let params = {
        cardId: req.params.id,
        cardData: await cardsData.getOneCard(req.params.id),
        headline: "עריכת כרטיס הברכה"
      };
      res.render("newCard.ejs", params);
    })

    //edit existing card
    .post("/cards/:id/edit", isLoggedIn, async (req, res) => {
      let cardId = req.params.id;
      let card = req.body.card;
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
      res.render("register", {
        name: "",
        message: "",
        firstName: "",
        lastName: "",
        email: ""
      });
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
      res.render("editUser", req.user);
    })
    .post("/edit", isLoggedIn, async (req, res) => {
      //This is for DEV only!
      //TODO - delete on deploy
      req.body.isAdmin = req.body.adminCode === "9876";
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
      res.render("login");
    })
    .post(
      "/login",
      passport.authenticate("local", {
        successRedirect: "/account",
        failureRedirect: "/login"
      }),
      () => {}
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
      // console.log("user", user.cards[0].cssStyle);

      res.render("account", user);
    })
    //admin page
    .get("/admin", isAdmin, (req, res) => {
      res.render("admin");
    });
}

module.exports = router;
