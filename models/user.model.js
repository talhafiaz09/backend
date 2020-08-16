var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  profilepicture: {
    data: Buffer,
    contentType: String,
  },
  verfied: {
    type: Boolean,
    default: false,
  },
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
