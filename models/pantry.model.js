var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Stuff = new Schema({ type: Array, default: [] });
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
    },
  ],
});
module.exports = mongoose.model("Pantry", pantrySchema);
