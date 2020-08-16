var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ingredientSchema = new Schema({
  name: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
});
module.exports = mongoose.model("Ingredients", ingredientSchema);
