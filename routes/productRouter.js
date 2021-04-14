const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Products = require("../models/products");
const productRouter = express.Router();
var multer = require("multer");
var image = multer({ dest: "uploads/" });
var carousel = multer({ dest: "uploads/carousel/" });

productRouter.use(bodyParser.json());
// for all products
productRouter
  .route("/")
  .get((req, res, next) => {
    Products.find({})
      .populate("adOns sub_id")
      .then(
        (products) => {
          res.statusCode = "200";
          res.setHeader("Content-Type", "application/json");
          res.json(products);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  // .post( (req, res, next) => {
  //     Products.create( req.body )
  //      .then((product)=>{
  //          console.log('Products added', product)
  //          res.statusCode = 200
  //          res.setHeader('Content-Type', 'application/json')
  //          res.json(product)
  //      }, (err) => next(err))
  //      .catch((err) => next(err))
  // })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /products");
  })
  .delete((req, res, next) => {
    Products.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

productRouter.post(
  "/",
  image.single("image"),

  function (req, res, next) {
    Products.create(req.body)
      .then(
        (product) => {
          console.log("Products added", product);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);

productRouter
  .route("/:productId")
  .get((req, res, next) => {
    Products.findById(req.params.productId)
      .populate("adOns sub_id")
      .then(
        (product) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /products/" + req.params.productId
    );
  })
  .put((req, res, next) => {
    Products.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (product) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Products.findByIdAndRemove(req.params.productId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = productRouter;
