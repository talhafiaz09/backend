var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var favouriteSchema = new Schema({
  useremail: {
    type: String,
  },
  recipeId: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Favourites", favouriteSchema);
