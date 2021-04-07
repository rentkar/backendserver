var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/productRouter");
var subproductRouter = require("./routes/subproductRouter");
var lenderreqRouter = require("./routes/lenderreqRouter");
var supportRouter = require("./routes/supportRouter");
var dataRouter = require("./routes/dataRouter");
var orderreqRouter = require("./routes/orderreqRouter");
var ordersRouter = require("./routes/ordersRouter");
var session = require("express-session");
var FileStore = require("session-file-store")(session);

var app = express();

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/rentkar";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

connect.then(
  (db) => {
    console.log("Connected to server");
  },
  (err) => {
    console.log("Connection failed.....");
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    name: "session-id",
    secret: "12345-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
var razorpayRouter = require("./routes/razorpayRouter");

function auth(req, res, next) {
  //  console.log(req.headers)
  console.log(req.session);

  if (!req.session.user) {
    var err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 403;
    return next(err);
  } else {
    if (req.session.user === "authenticated") {
      next();
    } else {
      var err = new Error("You are not authenticated!");
      err.status = 403;
      return next(err);
    }
  }
}

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser("12345-67890-09876-54321"));
//app.use(auth)
app.use("/products", productRouter);
app.use("/subproducts", subproductRouter);
app.use("/support", supportRouter);
app.use("/data", dataRouter);
app.use("/orderreq", orderreqRouter);
app.use("/orders", ordersRouter);
app.use("/lenderreq", lenderreqRouter);
app.use(`/razorpay`, razorpayRouter);

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
