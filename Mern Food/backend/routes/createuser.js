const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assuming the User model is exported correctly
const router = express.Router();

const jwtSecret = "HelloWorldkaisehosablogkyachalrhah";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password")
      .isLength({ min: 5, max: 15 })
      .withMessage("Password length should be between 5 and 15 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        location,
      });

      res.json({ success: true, user });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
);

router.post(
  "/loginuser",
  [body("email").isEmail(), body("password").isLength({ min: 5, max: 15 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          res
            .status(400)
            .json({ success: false, error: "Login using correct credentials" });
        } else {
          bcrypt
            .compare(password, user.password)
            .then((match) => {
              if (match) {
                const data = {
                  user: {
                    id: user.id,
                  },
                };

                const authToken = jwt.sign(data, jwtSecret);

                res.json({ success: true, authToken });
              } else {
                res
                  .status(400)
                  .json({ success: false, error: "Invalid Password" });
              }
            })
            .catch((err) => {
              res.status(400).json({ success: false, error: err.message });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({ success: false, error: err.message });
      });
  }
);

module.exports = router;
