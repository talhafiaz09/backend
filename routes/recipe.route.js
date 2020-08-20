var express = require("express");
var recipeRouter = express.Router();
var RecipeDB = require("../models/recipeDB.model");
var Pantry = require("../models/pantry.model");
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
  recipeDB.rating = req.body.rating;
  recipeDB.nutrition = req.body.nutrition;
  recipeDB.video = req.body.video;
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
recipeRouter.get("/getrecipesonbaseofpantry/:id", (req, res) => {
  console.log(req.params.id);
  Pantry.findOne({ _id: req.params.id }, (err, pantry) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Pantry not found!!",
        error: err,
      });
    } else {
      var ingredients = [];
      pantry.ingredients.forEach((i) => ingredients.push(i));
      RecipeDB.find({}, (err, recipies) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status: "Recipies not found!!",
            error: err,
          });
        } else {
          var ingredients_exist = [];
          let filteredResults = recipies.filter((result) => {
            let containsIngredient = result.ingredients.filter((ingredient) => {
              return (
                ingredients.findIndex(
                  (I) => I.toLowerCase() === ingredient.name.toLowerCase()
                ) !== -1
              );
            });
            if (containsIngredient.length !== 0) {
              ingredients_exist.push(containsIngredient);
            }
            return containsIngredient.length !== 0;
          });
          console.log(filteredResults.length);
          if (filteredResults.length == 0 || filteredResults == null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Recipies null!!",
              found: false,
            });
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              found: true,
              status: "Recipies found!!",
              filteredResults: filteredResults,
              ingredients_exist: ingredients_exist,
            });
          }
        }
      });
    }
  });
});
recipeRouter.get("/getallrecipiefromdb", (req, res) => {
  RecipeDB.find({}, (err, recipies) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Recipies not found!!",
        error: err,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Recipies found!!",
        recipies: recipies,
      });
    }
  });
});
recipeRouter.post("/getallfavouriterecipesfromdb", (req, res) => {
  RecipeDB.find({ _id: req.body.id_array }, (err, recipies) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Recipies not found!!",
        error: err,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Recipies found!!",
        recipies: recipies,
      });
    }
  });
});
module.exports = recipeRouter;
