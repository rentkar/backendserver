var express = require("express");
var router = express.Router();

const Razorpay = require("razorpay");
const request = require("request");

const keys = require("../key");

const razorInstance = new Razorpay({
  key_id: keys.razorIdkey,
  key_secret: keys.razorIdSecret,
});
router.get("/order", (req, res, next) => {
  try {
    const options = {
      amount: 10 * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
    };
    razorInstance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong!!!",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong!!!",
    });
  }
});

router.post("/capture/:paymentId", (req, res, next) => {
  try {
    return request(
      {
        method: "POST",
        url: `https://${keys.razorIdkey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 10 * 100,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: "Something went wrong!!!",
          });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
