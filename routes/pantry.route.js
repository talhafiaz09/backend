var express = require("express");
var Pantry = require("../models/pantry.model");
var pantryRouter = express.Router();
//Add pantry
pantryRouter.post("/addIngredients", (req, res) => {
  const pantry = new Pantry();
  pantry.name = req.body.pantryname;
  pantry.ingredients = req.body.ingredients;
  pantry.useremail = req.body.useremail;
  Pantry.create(pantry, (err, pantry) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Pantry not added!!",
        error: err,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Pantry added!!",
        Pantry: pantry,
      });
    }
  });
});
pantryRouter.get("/userallpantries/:useremail", (req, res) => {
  Pantry.find({ useremail: req.params.useremail }, (err, pantry) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Pantries not found!!",
        error: err,
      });
    } else {
      if (pantry.length != 0) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Pantries found!!",
          Pantry: pantry,
        });
      } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "No pantries found!!",
        });
      }
    }
  });
});
pantryRouter.delete("/userallpantries/:pantryid", (req, res) => {
  Pantry.deleteOne({ _id: req.params.pantryid }, (err) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Pantry not deleted!!",
        error: err,
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Pantries deleted",
      });
    }
  });
});
pantryRouter.put("/addingingredienttopantry/:pantryid", (req, res) => {
  Pantry.findOne({ _id: req.params.pantryid }, (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Ingredient not added!!",
        error: err,
      });
    } else {
      if (result.ingredients.includes(req.body.ingredientname)) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Ingredient exist",
          error: err,
        });
      } else {
        result.ingredients.push(req.body.ingredientname);
        result.save();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Ingredient added",
        });
      }
    }
  });
});
pantryRouter.put("/updatepantryname/:pantryid", (req, res) => {
  Pantry.findOneAndUpdate(
    { _id: req.params.pantryid },
    { name: req.body.pantryname },
    (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Pantry name Not updated!!",
          error: err,
        });
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Pantry updated",
          Pantry: result,
        });
      }
    }
  );
});
pantryRouter.put("/deleteingredientfrompantry/:pantryid", (req, res) => {
  Pantry.findOne({ _id: req.params.pantryid }, (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Ingredient not deleted!!",
        error: err,
      });
    } else {
      console.log(req.body.ingredientindex);
      result.ingredients.splice(req.body.ingredientindex, 1);
      result.save();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Ingredient deleted",
      });
    }
  });
});
module.exports = pantryRouter;
