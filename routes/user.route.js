var express = require("express");
var passport = require("passport");
var authenticate = require("../authenticate");
var User = require("../models/user.model");
var userRouter = express.Router();
var fs = require("fs");
var multer = require("multer");
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox1a754ed2185342c18e7e96ca4931d848.mailgun.org?";
const api_key = "cb0afb2376ebd5982b1e26fc20bc2f96-f7d0b107-dba4fcf7";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
//Login
userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "User not found !!",
        error: info,
        Info: user,
      });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          res.statusCode = 401;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: false,
            status: "Login Unsuccessful !!",
            error: "Could not login user !!",
          });
          return;
        }
        var token = authenticate.getToken({ _id: req.user._id });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Login Successful !!",
          token: token,
          user: user,
        });
      });
    }
  })(req, res, next);
});
//Signup
userRouter.post("/signup", (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.profilepicture.data = req.body.profilepictureBase64;
  user.profilepicture.contentType = req.body.contentType;
  User.register(user, req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: false,
        status: "Registration Unsuccessful !!",
        error: err,
      });
    } else {
      passport.authenticate("local")(req, res, () => {
        // const data = {
        //   from: "myfridge_noreply@official.com",
        //   to: req.body.username,
        //   subject: "Verification",
        //   html: `
        //     <h1>Verify your account</h1>
        //     <a>http://localhost:3000</a>
        //   `,
        // };
        // mg.messages().send(data, function (error, body) {
        //   if (error) {
        //     res.statusCode = 500;
        //     res.setHeader("Content-Type", "application/json");
        //     res.json({
        //       success: false,
        //       status: "Registration Unsuccessful !!",
        //       error: err,
        //     });
        //   } else {
        //     console.log(body);
        // }
        // });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          status: "Registration Successful !!",
          user: user,
        });
      });
    }
  });
});
//Find one
userRouter.get("/finduser/:id", function (req, res, next) {
  User.findById(req.params.id, function (err, result) {
    if (err) {
      return next(err);
    }
    console.log(result);
    res.contentType(result.profilepicture.contentType);
    res.send(result.profilepicture.data);
  });
});
//Find all users
userRouter.get("/allusers", function (req, res, next) {
  User.find().exec(function (error, results) {
    if (error) {
      return next(error);
    }
    res.json(results);
  });
});
module.exports = userRouter;
