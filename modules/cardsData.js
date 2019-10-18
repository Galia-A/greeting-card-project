//mongoose
const mongooseConnect = require("./mongooseConnect");
const mongoose = mongooseConnect.getMongoose();

// card Schema(s)
let cardSchema = new mongoose.Schema({
  recipientDescription: String,
  gender: String,
  genderDescription: String,
  eventType: String,
  eventDescription: String,
  style: String,
  interests: String,
  senderNameDescription: String,
  senderSignature: String,
  senderSignatureDescription: String,
  picUrl: String,
  cssStyle: String,
  user: mongoose.Schema.Types.ObjectId,
  // {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // }
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
function addNewCard(card) {
  let newCard = new Card(card);
  return newCard.save();
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

function editCard(cardId, editedCard) {
  return Card.findByIdAndUpdate(cardId, editedCard);
}

module.exports = {
  getOneCard: getOneCard,
  addNewCard: addNewCard,
  updateFinalImgUrl: updateFinalImgUrl,
  editCard: editCard
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
//   senderSignatureDescription: "מאחלים",
//   senderSignature: "malePlural",
//   picUrl: "https://live.staticflickr.com/7475/16113593846_4b113741fc_b.jpg",
//   userId: mongoose.Types.ObjectId(),
//   cssStyle: "border1",
//   line1Description: "שפע עכברים ומחילות",
//   line2Description: "שנהיה יחד בכל הלילות!",
//   finalCardPicUrl: "",
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
