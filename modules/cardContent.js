//mongoose
const mongooseConnect = require("./mongooseConnect");
const mongoose = mongooseConnect.getMongoose();
//data
const cardsData = require("./cardsData");

//style guide
let stylesContent = {
  classic: {
    genderDescription: ["היקר", "היקרה"],
    cssStyles: ["border1"]
  },
  geek: {
    genderDescription: ["השולט!!1", "השולטת!!1"],
    cssStyles: ["border1"]
  }
};

//signiture content
let signitureContent = {
  malePlural: "מאחלים",
  femalePlural: "מאחלות",
  maleSingle: "מאחל",
  femaleSingle: "מאחלת"
};

//event greetings
let greetingContent = {
  birthday: ["מזל טוב!", "מזל טוב ליום הולדתך!", "יום הולדת שמח!"],
  degree: ["כל הכבוד!", "שיחקת אותה!", "יאללה לדוקטורט!"]
};

//interests greetings
let interestsGreetings = {
  general: [["שפע ברכות ואיחולים,", "בריאות, שמחה, אהבה והצלחה בכל התחומים"]],
  cats: [["שפע עכברים ומחילות", "שנהיה יחד בכל הלילות!"]]
};

//pics urls
let interestsPics = {
  general: ["/images/balloons.png"],
  cats: ["https://live.staticflickr.com/7475/16113593846_4b113741fc_b.jpg"]
};

function createCardContent(userCard) {
  //console.log(`userCard: ${JSON.stringify(userCard)}`);

  let recipientDescription = validateInput(userCard.forname);
  let gender = validateGender(userCard.gender);
  let style = validateStyle(userCard.style);
  let genderDescription = createGenderDescription(
    recipientDescription,
    gender,
    style
  );
  let eventType = validateEventType(userCard.eventType);
  let eventDescription = createEventDescription(eventType);
  let interests = validateInterests(userCard.interests);
  let senderNameDescription = validateInput(userCard.senderName);
  let senderSignature = validateSigniture(userCard.senderSignature);
  let senderSignatureDescription = createSigniture(
    senderSignature,
    senderNameDescription
  );
  let picUrl = createPicUrl(interests);
  let userId = mongoose.Types.ObjectId(); //getUserId();
  let cssStyle = createCssStyle(style);
  let msg = createMsg(interests);
  let line1Description = msg[0];
  let line2Description = msg[1];

  let newCard = {
    recipientDescription: recipientDescription,
    gender: gender,
    genderDescription: genderDescription,
    eventType: eventType,
    eventDescription: eventDescription,
    style: style,
    interests: interests,
    senderNameDescription: senderNameDescription,
    senderSignature: senderSignature,
    senderSignatureDescription: senderSignatureDescription,
    picUrl: picUrl,
    user: userId,
    cssStyle: cssStyle,
    line1Description: line1Description,
    line2Description: line2Description,
    finalCardPicUrl: ""
  };
  console.log("new card ", newCard);
  return cardsData.addNewCard(newCard);
}
function validateInput(input) {
  return input.trim().length === 0 ? "" : input.trim();
}
function validateGender(input) {
  return input.length === 0 ? "" : input;
}
function validateStyle(input) {
  return input.length === 0 ? "classic" : input;
}
function validateEventType(input) {
  return input.length === 0 ? "birthday" : input;
}
function validateInterests(input) {
  return input ? input : ["general"];
}
function validateSigniture(input) {
  return input.length === 0 ? "malePlural" : input;
}
function createGenderDescription(name, gender, style) {
  if (name.length === 0 || gender.length === 0) {
    return "";
  } else {
    return (
      stylesContent[style].genderDescription[gender === "male" ? 0 : 1] + ","
    );
  }
}
function createEventDescription(eventType) {
  let greetings = greetingContent[eventType];
  let random = randomBetween(0, greetings.length - 1);
  return greetings[random];
}
function createSigniture(signitureType, senderName) {
  return senderName.length === 0 ? "" : signitureContent[signitureType];
}
function createPicUrl(interest) {
  let pics = interestsPics[interest];
  let random = randomBetween(0, pics.length - 1);
  return pics[random];
}
function createCssStyle(style) {
  let cssStyle = stylesContent[style].cssStyles;
  let random = randomBetween(0, cssStyle.length - 1);
  return cssStyle[random];
}
function createMsg(interest) {
  let options = interestsGreetings[interest];
  let random = randomBetween(0, options.length - 1);
  return options[random];
}

function randomBetween(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

module.exports = { createCardContent: createCardContent };
