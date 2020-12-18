var express = require("express");
var Favourite = require("../models/favourite.model");
var favouriteRouter = express.Router();
favouriteRouter.post("/addtofavourite", (req, res) => {
  const favourite = new Favourite();
  favourite.useremail = req.body.useremail;
  favourite.recipeId = req.body.recipeId;
  Favourite.findOne({ useremail: req.body.useremail }, (err, result) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Instance not created!!",
        error: err,
      });
    } else {
      if (result == null) {
        Favourite.create(favourite, (err, favourite) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: false,
              status: "Not added to favourite!!",
              error: err,
            });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Added to favourite!!",
              favourite: favourite,
            });
          }
        });
      } else {
        if (result.recipeId.includes(req.body.recipeId)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Already exist",
            error: err,
          });
        } else {
          result.recipeId.push(req.body.recipeId);
          result.save();
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Added to favourite!!",
          });
        }
      }
    }
  });
});
favouriteRouter.delete("/removefromfavourite", (req, res) => {
  Favourite.findOne({ useremail: req.body.useremail }, (err, favourite) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Not deleted from favourite!!",
        error: err,
      });
    } else {
      favourite.recipeId.forEach((I) => {
        if (I === req.body.recipeId) {
          favourite.recipeId.splice(favourite.recipeId.indexOf(I), 1);
        }
      });
      favourite.save();
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Deleted from favourite!!",
        favourite: favourite,
      });
    }
  });
});
favouriteRouter.post("/findfavouriterecipies", (req, res) => {
  Favourite.findOne({ useremail: req.body.useremail }, (err, favourite) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Not found in favourite!!",
        error: err,
      });
    } else {
      if (favourite == null) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Exist in favourite!!",
          exist: false,
          favourite: favourite,
        });
      } else if (favourite.recipeId.includes(req.body.recipeId)) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Exist in favourite!!",
          exist: true,
          favourite: favourite,
        });
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Not exist in favourite!!",
          exist: false,
          favourite: favourite,
        });
      }
    }
  });
});
favouriteRouter.post("/getallfavouriterecipies", (req, res) => {
  console.log(req.body);
  Favourite.findOne({ useremail: req.body.useremail }, (err, favourite) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "No favourite found!!",
        error: err,
      });
    } else if (favourite == null) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "No favourite found!!",
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "Favourite recipe found!!",
        favourite: favourite,
      });
    }
  });
});
module.exports = favouriteRouter;
