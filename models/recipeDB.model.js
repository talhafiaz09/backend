var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var recipeDBSchema = new Schema({
  name: {
    type: String,
  },
  ingredients: [
    {
      quantity: {
        type: String,
      },
      name: {
        type: String,
      },
      type: { type: String },
    },
  ],
  steps: [
    {
      type: String,
    },
  ],
  timers: [
    {
      type: String,
    },
  ],
  imageURL: {
    type: String,
  },
  originalURL: {
    type: String,
  },
});
module.exports = mongoose.model("RecipeDB", recipeDBSchema);
