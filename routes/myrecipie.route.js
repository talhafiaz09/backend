var express = require("express");
var Myrecipie = require("../models/myrecipie.model");
var myrecipieRouter = express.Router();
var RecipeDB = require("../models/recipeDB.model");
myrecipieRouter.post("/addtomyrecipie", (req, res) => {
  //   console.log(req.body);
  const myrecipie = new Myrecipie();
  myrecipie.useremail = req.body.useremail;
  myrecipie.recipeId = req.body.recipeId;
  Myrecipie.findOne({ useremail: req.body.useremail }, (err, result) => {
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
        Myrecipie.create(myrecipie, (err, myrecipie) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: false,
              status: "Not added to my recipie!!",
              error: err,
            });
          } else {
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Added to my recipie!!",
              myrecipie: myrecipie,
            });
          }
        });
      } else {
        // if (result.recipeId.includes(req.body.recipeId)) {
        //   res.statusCode = 200;
        //   res.setHeader("Content-Type", "application/json");
        //   res.json({
        //     success: true,
        //     status: "Already exist",
        //     error: err,
        //   });
        // } else {
        result.recipeId.push(req.body.recipeId);
        result.save();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Added to my recipie!!",
        });
        // }
      }
    }
  });
});
myrecipieRouter.delete("/removefrommyrecipie", (req, res) => {
  Myrecipie.findOne({ useremail: req.body.useremail }, (err, favourite) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Not deleted from my recipie!!",
        error: err,
      });
    } else {
      favourite.recipeId.forEach((I) => {
        if (I === req.body.recipeId) {
          favourite.recipeId.splice(favourite.recipeId.indexOf(I), 1);
        }
      });
      favourite.save();
      RecipeDB.findOneAndDelete({ _id: req.body.recipeId }, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status: "Not deleted from recipie db!!",
            error: err,
          });
        } else {
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Deleted from my recipie!!",
            data: data,
          });
        }
      });
    }
  });
});
// myrecipieRouter.post("/findfavouriterecipies", (req, res) => {
//   Favourite.findOne({ useremail: req.body.useremail }, (err, favourite) => {
//     if (err) {
//       res.statusCode = 500;
//       res.setHeader("Content-Type", "application/json");
//       res.json({
//         success: false,
//         status: "Not found in favourite!!",
//         error: err,
//       });
//     } else {
//       if (favourite == null) {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json({
//           success: true,
//           status: "Exist in favourite!!",
//           exist: false,
//           favourite: favourite,
//         });
//       } else if (favourite.recipeId.includes(req.body.recipeId)) {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json({
//           success: true,
//           status: "Exist in favourite!!",
//           exist: true,
//           favourite: favourite,
//         });
//       } else {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json({
//           success: true,
//           status: "Not exist in favourite!!",
//           exist: false,
//           favourite: favourite,
//         });
//       }
//     }
//   });
// });
myrecipieRouter.post("/getallmyrecipies", (req, res) => {
  // console.log(req.body);
  Myrecipie.findOne({ useremail: req.body.useremail }, (err, favourite) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "No my recipies found!!",
        error: err,
      });
    } else if (favourite == null) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "No my recipies found!!",
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "My recipe found!!",
        favourite: favourite,
      });
    }
  });
});
module.exports = myrecipieRouter;
