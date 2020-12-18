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
  mealtype: [
    {
      type: String,
      default: null,
    },
  ],
  cuisine: [
    {
      type: String,
      default: null,
    },
  ],
  steps: [
    {
      type: String,
      default: null,
    },
  ],
  timerequired: {
    type: String,
    default: null,
  },

  imageURL: {
    type: String,
    default: null,
  },

  rating: {
    type: String,
    default: "0",
  },
  nutrition: {
    proteins: {
      type: String,
      default: "0",
    },
    fats: {
      type: String,
      default: "0",
    },
    fiber: {
      type: String,
      default: "0",
    },
    vitamins: {
      type: String,
      default: "0",
    },
    carbohydrate: {
      type: String,
      default: "0",
    },
  },
  video: {
    type: String,
    default: "",
  },
  originalURL: { type: String, default: null },
  useremail: { type: String, default: null },
  phonenumber: { type: String, default: null },
  report: { type: String, default: null },
});
module.exports = mongoose.model("RecipeDB", recipeDBSchema);
