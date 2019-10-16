//mongoose
const mongooseConnect = require("./mongooseConnect");
const mongoose = mongooseConnect.getMongoose();

// card Schema(s)
let cardSchema = new mongoose.Schema({
  cardId: Number, //save in user db //???
  recipientDescription: String, //חתול
  gender: String,
  genderDescription: String, //gender + style > היקר/ה, השולט/ת
  eventType: String,
  eventDescription: String, //first random line + style? > מזל טוב ליום הולדת! יום הולדת שמח!
  style: String,
  interests: [String], // for pic
  senderNameDescription: String,
  senderPluralDescription: String, //change to מאחלים
  picUrl: String, //event type + interests > random from lists
  cssStyle: String, //need?
  userId: mongoose.Schema.Types.ObjectId,
  line1Description: String,
  line2Description: String,
  finalCardPicUrl: String
});
let Card = mongoose.model("Card", cardSchema);

//DB functions
//show one card
function getOneCard(cardId) {
  return Card.findById(mongoose.Types.ObjectId(cardId));
}

//add new card
function addNewCard(
  recipient,
  gender,
  eventType,
  style,
  interests,
  senderName,
  senderPlural,
  picUrl,
  userId,
  cssStyle,
  cardId
) {
  let newCard = new Card({
    recipientDescription: recipientDescription,
    gender: gender,
    genderDescription: genderDescription,
    eventType: eventType,
    eventDescription: eventDescription,
    style: style,
    interests: interests,
    senderNameDescription: senderNameDescription,
    senderPluralDescription: senderPluralDescription,
    picUrl: picUrl,
    cssStyle: cssStyle,
    userId: userId,
    line1Description: line1Description,
    line2Description: line2Description,
    finalCardPicUrl: finalCardPicUrl
  });
  newCard.save((err, result) => {
    if (err) {
      console.log("error inserting the card: " + err);
    } else {
      console.log("Card was inserted successfully!");
      // console.log(result);
    }
  });
}
function updateFinalImgUrl(cardId, url) {
  Card.findByIdAndUpdate(
    cardId,
    {
      finalCardPicUrl: url
    },
    (err, card) => {
      if (err) {
        console.log("update final img url error: ", err);
      } else {
        console.log("update final img url success! ");
      }
    }
  );
}

module.exports = {
  getOneCard: getOneCard,
  addNewCard: addNewCard,
  updateFinalImgUrl: updateFinalImgUrl
};

//-- demo card --//
// let newCard = new Card({
//   recipientDescription: "חתול",
//   gender: "male",
//   genderDescription: "היקר",
//   eventType: "birthday",
//   eventDescription: "מזל טוב ליום הולדתך!",
//   style: "classic",
//   interests: ["cat"],
//   senderNameDescription: "גלי ובן",
//   senderPluralDescription: "מאחלים",
//   picUrl: "https://live.staticflickr.com/7475/16113593846_4b113741fc_b.jpg",
//   userId: mongoose.Types.ObjectId(),
//   cssStyle: "border1",
//   line1Description: "שפע עכברים ומחילות",
//   line2Description: "שנהיה יחד בכל הלילות!",
//   finalCardPicUrl: "",
//   cardId: 1
// });
// newCard.save((err, result) => {
//   if (err) {
//     console.log("error inserting the card: " + err);
//   } else {
//     console.log("OK!");
//     console.log(result);
//   }
// });

/////////////////////////////////////////////////////////////
/*

// DB Schema(s)
let postSchema = new mongoose.Schema({
  headline: String,
  picUrl: String,
  description: String,
  content: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
let Post = mongoose.model("Post", postSchema);

function addNewPost(pHeadline, pPicUrl, pDescription, pContent) {
  Post.create(
    {
      headline: pHeadline,
      picUrl: pPicUrl,
      description: pDescription,
      content: pContent
    },
    (err, post) => {
      if (err) {
        console.log("error: ", err);
      } else {
        console.log("success! ", post);
      }
    }
  );
}

function getAllPosts() {
  return Post.find({}); //,(err,list)=>{
}

//one post with comments
function getOnePost(postId) {
  return Post.findById(postId)
    .populate("comments")
    .exec();
}

function updatePost(pId, pHeadline, pPicUrl, pDescription, pContent) {
  Post.findByIdAndUpdate(
    pId,
    {
      headline: pHeadline,
      picUrl: pPicUrl,
      description: pDescription,
      content: pContent
    },
    (err, post) => {
      if (err) {
        console.log("error: ", err);
      } else {
        console.log("success! ", post);
      }
    }
  );
}

function deletePost(pId) {
  Post.findByIdAndDelete(pId, (err, post) => {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("success! ", post);
    }
  });
}

//COMMENTS//

function addNewComment(commentTxt, pId) {
  Comment.create(
    {
      text: commentTxt
    },
    function(err, comment) {
      Post.findById(pId, function(err, post) {
        if (err) {
          console.log("error finding post for comments: " + err);
        } else {
          post.comments.push(comment);
          post.save(function(err, data) {
            if (err) {
              console.log("oops: " + err);
            } else {
              console.log(data);
            }
          });
        }
      });
    }
  );
}
*/
