var express = require("express");
var recipeRouter = express.Router();
var RecipeDB = require("../models/recipeDB.model");
var request = require("request");
var options = {
  method: "GET",
  url: "https://tasty.p.rapidapi.com/recipes/list",
  qs: {},
  headers: {
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": "2ed6105fa7msh693e10887ef2adcp1adf61jsna18482b68e2c",
    useQueryString: true,
  },
};
recipeRouter.get("/getrecipiesfromapi", (req, res) => {
  request(options, function (error, response, body) {
    if (error) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Result not fetched from api !!",
        error: error,
      });
    } else {
      var parsedData = JSON.parse(body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Result fetched from api !!",
        result: parsedData.results,
      });
    }
  });
});
recipeRouter.post("/addrecipefromrecipedb", (req, res) => {
  const recipeDB = new RecipeDB();
  recipeDB.name = req.body.name;
  recipeDB.ingredients = req.body.ingredients;
  recipeDB.steps = req.body.steps;
  recipeDB.timers = req.body.timers;
  recipeDB.imageURL = req.body.imageURL;
  recipeDB.originalURL = req.body.originalURL;
  RecipeDB.create(recipeDB, (err, recipe) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Recipe not added!!",
        error: err,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Recipe added!!",
        Recipe: recipe,
      });
    }
  });
});
module.exports = recipeRouter;
