var express = require("express");
var Pantry = require("../models/pantry.model");
var pantryRouter = express.Router();
//Add pantry
pantryRouter.post("/addPantry", (req, res) => {
  Pantry.create(
    {
      name: req.body.pantryname,
      ingredients: [],
      useremail: req.body.useremail,
    },
    (err, pantry) => {
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
    }
  );
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
      if (pantry != null) {
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
pantryRouter.post("/deletePantry", (req, res) => {
  Pantry.deleteOne({ _id: req.body.key }, (err, result) => {
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
pantryRouter.put("/addingingredienttopantry/:index", (req, res) => {
  Pantry.findOne({ _id: req.params.index }, (err, result) => {
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
        res.statusCode = 200;
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
pantryRouter.put("/updatepantryname/:id", (req, res) => {
  Pantry.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.pantryname },
    (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Pantry name not updated!!",
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
