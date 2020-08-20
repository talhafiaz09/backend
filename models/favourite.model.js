var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var favouriteSchema = new Schema({
  useremail: {
    type: String,
    required: true,
  },
  recipeId: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model("Favourites", favouriteSchema);
