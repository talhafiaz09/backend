var express = require("express");
var shoppingListRouter = express.Router();
var ShoppingList = require("../models/shoppingList.model");

shoppingListRouter.post("/addtoshoppinglist", (req, res) => {
  console.log(req.body);
  ShoppingList.findOne({ useremail: req.body.useremail }, (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Ingredient not added!!",
        error: err,
      });
    } else {
      if (result == null) {
        ShoppingList.create(
          {
            ingredients: [req.body.ingredientname],
            buy: [false],
            useremail: req.body.useremail,
          },
          (err, ingredient) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({
                success: false,
                status: "Ingredient not added!!",
                error: err,
              });
            } else {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json({
                success: true,
                status: "Ingredient added!!",
                ingredient: ingredient,
              });
            }
          }
        );
      } else {
        if (result.ingredients.includes(req.body.ingredientname)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status: "Ingredient exist",
          });
        } else {
          result.ingredients.push(req.body.ingredientname);
          result.buy.push(false);
          result.save();
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Ingredient added!!",
            ingredient: result,
          });
        }
      }
    }
  });
});
shoppingListRouter.get("/allshoppinglist/:useremail", (req, res) => {
  ShoppingList.findOne(
    { useremail: req.params.useremail },
    (error, shoppingList) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Shopping list not fetched!!",
          error: error,
        });
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Shopping list fetched!!",
          shoppingList: shoppingList,
        });
      }
    }
  );
});
shoppingListRouter.put("/removefromshoppinglist", (req, res) => {
  ShoppingList.findOne(
    { useremail: req.body.useremail },
    (error, shoppingList) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: false,
          status: "Ingredient not removed!!",
          error: error,
        });
      } else {
        shoppingList.ingredients.splice(req.body.index, 1);
        shoppingList.buy.splice(req.body.index, 1);
        shoppingList.save();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Ingredient removed!!",
          shoppingList: shoppingList,
        });
      }
    }
  );
});
module.exports = shoppingListRouter;
