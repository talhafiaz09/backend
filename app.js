var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var { mongoDBUrl } = require("./configuration");
var passport = require("passport");
//Database Connectivity
const connection = mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
connection.then(
  (db) => {
    console.log("Connected to database!!");
  },
  (err) => {
    console.log("Error connecting to database!!");
  }
);

//Getting routes
var userRouter = require("./routes/user.route");
var ingredientRouter = require("./routes/ingredient.route");
var pantryRouter = require("./routes/pantry.route");
var recipeRouter = require("./routes/recipe.route");
var favouriteRouter = require("./routes/favourite.route");
var shoppingListRouter = require("./routes/shoppingList.route");
var myrecipieRouter = require("./routes/myrecipie.route");
// var testApi = require("./routes/test.route");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(passport.initialize());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes mount points
app.use("/user", userRouter);
app.use("/ingredient", ingredientRouter);
app.use("/pantry", pantryRouter);
app.use("/recipe", recipeRouter);
app.use("/favourite", favouriteRouter);
app.use("/shoppinglist", shoppingListRouter);
app.use("/myrecipie", myrecipieRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
