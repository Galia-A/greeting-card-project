//mongoose
const mongooseConnect = require("./mongooseConnect");
const mongoose = mongooseConnect.getMongoose();
//data
const cardsData = require("./cardsData");

//style guide
let stylesContent = {
  classic: {
    genderDescription: [" היקר", " היקרה"],
    cssStyles: ["border1 text1"]
  },
  geek: {
    genderDescription: [" השולט!!1", " השולטת!!1"],
    cssStyles: ["border2 text2"]
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
  degree: ["כל הכבוד!", "שיחקת אותה!", "יאללה לדוקטורט!"],
  anniversary: ["מזל טוב לרגל האירוסין!", "נתראה בחתונה!", "מזל טוב!"],
  newyear: ["שנה טובה!", "יאללה מחדש!", "שנה טובה ומתוקה!"]
};

//interests greetings
let interestsGreetings = {
  general: [
    ["שפע ברכות ואיחולים,", "בריאות, שמחה, אהבה והצלחה בכל התחומים"],
    ["שתהיה שנה קסומה ומקסימה!", "מלאת הרפתקאות, ניסים ונפלאות!"],
    ["שתהיה שנה של הגשמת משאלות!", "מלאה באנשים מחייכים ובעניים נוצצות!"]
  ],
  cats: [
    ["שפע עכברים ומחילות", "שנהיה יחד בכל הלילות!"],
    ["שימיך יהיו מלאים בנוצות ועכברים", "ולילותיך מלאים בכרבולים"],
    ["שתמיד יהיה ציד מלהיב בסביבה", "ושלא יכלול ציפור במיטה..."]
  ],
  dogs: [
    ["שפע כרבולים ונביחות", "בכל הימים ובכל הלילות!"],
    ["שפע ליקוקים, טריקים וחטיפים", "שימיך יהיו מלאים טיולים ארוכים"]
  ],
  travel: [
    ["שפע ברכות ואיחולים,", "הרבה מסעות וטיולים!"],
    ["שפע טרקים, מסעות וטיולים", "מלאים בכיף, חברים וסיפורים!"]
  ],
  dance: [
    ["שפע ברכות ואיחולים,", "שתמיד תהיה סיבה לריקודים!"],
    ["שכל צעד וטאפ יהיו מושלמים!", "שכולם יראו ממה סופרסטארים עשויים!"],
    ["שתהיה שנה מלאה בשמחות!", "הופעות ומחיאות כפיים סוערות!"]
  ],
  lowbattery: [["שפע שטרות שוכבים בספה", "וטלפונים מהסוג האחרון שיצא!"]]
};

//pics urls
let interestsPics = {
  general: ["/images/cards/balloons.png"],
  cats: [
    "/images/cards/cat_butterfly.jpg",
    "/images/cards/cat_note.jpg",
    "/images/cards/cat_flowers.jpg",
    "/images/cards/cat_box.jpg"
  ],
  dogs: [
    "/images/cards/dog_returns.jpg",
    "/images/cards/dog_flower.jpg",
    "/images/cards/dog_love.jpg"
  ],
  travel: [
    "/images/cards/travel_mountain.jpg",
    "/images/cards/travel_bag.jpg",
    "/images/cards/travel_rocks.jpeg"
  ],
  dance: [
    "https://images-na.ssl-images-amazon.com/images/I/61FLNgtpMaL.jpg",
    "/images/cards/dance_wishes.jpg",
    "/images/cards/dance_dark1.png",
    "/images/cards/dance_dark2.png",
    "/images/cards/dance_dark3.jpg",
    "/images/cards/dance_irish.jpg"
  ],
  lowbattery: ["/images/cards/lowBattery2.png"]
};

function createCardContent(userCard, createNew = true, cardId) {
  //   console.log(`userCard: ${JSON.stringify(userCard)}`);
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
  let senderSignature = validateSignature(userCard.senderSignature);
  let senderSignatureDescription = createSigniture(
    senderSignature,
    senderNameDescription
  );
  let picUrl = createPicUrl(interests);
  let userId = userCard.user;
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
  if (createNew) {
    console.log("in create new card");
    return cardsData.addNewCard(newCard);
  } else {
    console.log("in EDIT new card");
    return cardsData.editCard(cardId, newCard);
  }
}
function validateInput(input) {
  return input.trim().length === 0 ? "" : input.trim();
}
function validateGender(input) {
  return input ? input : "";
}
function validateStyle(input) {
  return input ? input : "classic";
}
function validateEventType(input) {
  return input.length === 0 ? "birthday" : input;
}
function validateInterests(input) {
  return input ? input : "general";
}
function validateSignature(input) {
  return input.length === 0 ? "malePlural" : input;
}
function createGenderDescription(name, gender, style) {
  if (name.length === 0) {
    return "";
  } else if (name.length !== 0 && gender.length === 0) {
    return ",";
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
