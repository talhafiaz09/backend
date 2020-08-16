var express = require("express");
var Ingredients = require("../models/ingredients.model");
var ingredientRouter = express.Router();
//Add Ingredients
ingredientRouter.post("/addIngredients", (req, res) => {
  const ingredient = new Ingredients();
  ingredient.name = req.body.name;
  ingredient.ingredients = req.body.ingredients;
  Ingredients.create(ingredient, (err, ingredient) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Ingredients not added!!",
        error: err,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Ingredients added!!",
        Ingredient: ingredient,
      });
    }
  });
});
//View all Ingredients
ingredientRouter.get("/allingredients", (req, res) => {
  Ingredients.find().exec(function (error, ingredient) {
    if (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Ingredients not fetched!!",
        error: error,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Ingredients fetched!!",
        Ingredients: ingredient,
      });
    }
  });
});
module.exports = ingredientRouter;
