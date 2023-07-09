const express = require("express");
const Order = require("../models/Order");
const { route } = require("./createuser");
const router = express.Router();

router.post("/orderdata", async (req, res) => {
  try {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_data: req.body.order_data });

    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);

    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      })
        .then(() => {
          res.json({ success: true });
        })
        .catch((err) => {
          console.error(err);
          res.send("Server Error", err.message);
        });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      )
        .then(() => {
          res.json({ success: true });
        })
        .catch((err) => {
          console.error(err);
          res.send("Server Error", err.message);
        });
    }
  } catch (err) {
    console.error(err);
    res.send("Server Error", err.message);
  }
});

module.exports = router;
