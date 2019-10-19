//mongoose
const mongooseConnect = require("./mongooseConnect");
const mongoose = mongooseConnect.getMongoose();
const LocalStrategyMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
});
UserSchema.plugin(LocalStrategyMongoose);

module.exports = mongoose.model("User", UserSchema);
