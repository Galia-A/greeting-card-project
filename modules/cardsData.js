//mongoose
const mongooseConnect = require("./mongooseConnect");
const mongoose = mongooseConnect.getMongoose();

// card Schema(s)
let cardSchema = new mongoose.Schema({
  cardId: Number, //need?
  recipient: String,
  gender: String, //change to "dear"
  eventType: String,
  style: String,
  interests: [String],
  senderName: String,
  senderPlural: Boolean, //change to מאחלים
  picUrl: String,
  cssStyle: String, //need?
  userId: mongoose.Schema.Types.ObjectId
  //line1:String,
  //line2:String,
  //finalCardPicUrl:String
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
    recipient: recipient,
    gender: gender,
    eventType: eventType,
    style: style,
    interests: interests,
    senderName: senderName,
    senderPlural: senderPlural,
    picUrl: picUrl,
    userId: userId,
    cssStyle: cssStyle,
    cardId: cardId
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

module.exports = {
  getOneCard: getOneCard,
  addNewCard: addNewCard
  // getAllPosts: getAllPosts,
  // getOnePost: getOnePost,
  // updatePost: updatePost,
  // deletePost: deletePost,
  // addNewComment: addNewComment
};

//demo card
// let newCard = new Card({
//   recipient: "חתול",
//   gender: "male",
//   eventType: "birthday",
//   style: "classic",
//   interests: "cat",
//   senderName: "גלי ובן",
//   senderPlural: true,
//   picUrl: "https://live.staticflickr.com/7475/16113593846_4b113741fc_b.jpg",
//   userId: mongoose.Types.ObjectId(),
//   cssStyle: "border1",
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
