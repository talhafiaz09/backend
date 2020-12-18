var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var myrecipieSchema = new Schema({
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
module.exports = mongoose.model("Myrecipie", myrecipieSchema);
