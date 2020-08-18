var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var recipeDBSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  ingredients: [
    {
      quantity: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      type: { type: String, default: null },
    },
  ],
  steps: [
    {
      type: String,
      default: null,
    },
  ],
  timers: [
    {
      type: String,
      default: null,
    },
  ],
  imageURL: {
    type: String,
    default: null,
  },
  originalURL: {
    type: String,
    default: null,
  },
  rating: {
    type: String,
    default: null,
  },
});
module.exports = mongoose.model("RecipeDB", recipeDBSchema);
