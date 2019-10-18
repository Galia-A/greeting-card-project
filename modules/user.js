//mongoose
const mongooseConnect = require("./mongooseConnect");
const mongoose = mongooseConnect.getMongoose();
const LocalStrategyMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: String
});
UserSchema.plugin(LocalStrategyMongoose);

module.exports = mongoose.model("User", UserSchema);
