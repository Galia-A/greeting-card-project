//data
const cardsData = require("./cardsData");
// const userData = require('./userData');

function router(app) {
  app
    //  '/' home page
    .get("/", (req, res) => {
      res.render("homepage.ejs");
    })
    //create new card
    .get("/cards/new", (req, res) => {
      res.render("newCard.ejs");
    })
    //add data to DB & create the card
    .post("/cards", (req, res) => {
      let card = req.body.card;

      res.redirect("/cards/5da78a7f049476535803390c");
    })
    //show generated card
    .get("/cards/:id", async (req, res) => {
      let params = {
        cardData: await cardsData.getOneCard("5da78a7f049476535803390c")
      };
      // console.log("bur, ", params);

      res.render("showCard.ejs", params);
    })
    .post("/cards/:id", async (req, res) => {
      let imgUrl = req.body.imgUrl;
      let cardId = req.params.id;
      console.log("in update img url");

      //update db
      cardsData.updateFinalImgUrl(cardId, imgUrl);
    });

  //register

  //login

  //user profile

  //SHOW ALL POSTS - V
  /*    .get("/posts", async (req, res) => {
      //res.send("The book list");
      let params = {
        allPosts: await postsData.getAllPosts()
      };
      res.render("posts.ejs", params);
    })
    //ADD POST FORM - V
    .get("/post/new", (req, res) => {
      res.render("postNewForm.ejs");
    })
    //ADD POST TO DB - V
    .post("/posts", (req, res) => {
      let headline = req.body.headline;
      let picUrl = req.body.pictureUrl;
      let description = req.body.description;
      let content = req.body.content;
      postsData.addNewPost(headline, picUrl, description, content);
      res.redirect("/posts");
    })
    //SHOW 1 POST - V
    .get("/posts/:id", async (req, res) => {
      let pId = req.params.id;
      let params = {
        onePost: await postsData.getOnePost(pId)
      };
      res.render("post.ejs", params);
    })
    //EDIT POST - V
    .get("/posts/:id/edit", async (req, res) => {
      let pId = req.params.id;
      let params = {
        onePost: await postsData.getOnePost(pId)
      };
      res.render("edit.ejs", params);
    })
    //SAVE CHANE TO DB
    .put("/posts/:id", (req, res) => {
      let pId = req.params.id;
      let headline = req.body.headline;
      let picUrl = req.body.pictureUrl;
      let description = req.body.description;
      let content = req.body.content;
      postsData.updatePost(pId, headline, picUrl, description, content);
      res.redirect("/posts");
    })
    //DELETE
    .delete("/posts/:id", (req, res) => {
      let pId = req.params.id;
      postsData.deletePost(pId);
      res.redirect("/posts");
    })
    //Add a comment to DB
    .post("/posts/:id/comment", (req, res) => {
      let commentTxt = req.body.comment;
      let pId = req.params.id;
      postsData.addNewComment(commentTxt, pId);
      res.redirect(`/posts/${pId}`);
    });
    */
}

module.exports = router;
