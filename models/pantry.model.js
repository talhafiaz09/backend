var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pantrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
      default: null,
    },
  ],
});
module.exports = mongoose.model("Pantry", pantrySchema);
