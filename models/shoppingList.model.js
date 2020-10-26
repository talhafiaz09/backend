var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shoppingListSchema = new Schema({
  useremail: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  buy: [
    {
      type: Boolean,
      default: false,
    },
  ],
});
module.exports = mongoose.model("ShoppingList", shoppingListSchema);
