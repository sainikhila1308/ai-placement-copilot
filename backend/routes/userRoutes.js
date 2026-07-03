const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const OTP = require("../models/OTP");

const protect = require("../middleware/authMiddleware");

const { sendOTP } = require("../services/mailService");


// ==============================
// SEND OTP
// ==============================

router.post("/send-otp", async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                message: "Email is required."
            });

        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered."
            });

        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        await OTP.deleteMany({ email });

        await OTP.create({

            email,

            otp,

            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            )

        });

        await sendOTP(email, otp);

        res.json({

            message: "OTP sent successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

});


// ==============================
// VERIFY OTP
// ==============================

router.post("/verify-otp", async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {

            return res.status(400).json({

                message: "Email and OTP are required."

            });

        }

        const otpRecord = await OTP.findOne({

            email,
            otp

        });

        if (!otpRecord) {

            return res.status(400).json({

                message: "Invalid OTP."

            });

        }

        if (otpRecord.expiresAt < new Date()) {

            await OTP.deleteOne({

                _id: otpRecord._id

            });

            return res.status(400).json({

                message: "OTP Expired."

            });

        }

        res.json({

            message: "OTP Verified"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
// ==============================
// SIGNUP
// ==============================

router.post("/signup", async (req, res) => {

  try {

      const { name, email, password } = req.body;

      if (!name || !email || !password) {

          return res.status(400).json({
              message: "All fields are required."
          });

      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {

          return res.status(400).json({
              message: "Email already registered."
          });

      }

      const hashedPassword =
          await bcrypt.hash(password, 10);

      const user = await User.create({

          name,

          email,

          password: hashedPassword

      });

      // OTP is no longer needed
      await OTP.deleteMany({ email });

      res.status(201).json({

          message: "Account created successfully.",

          user: {

              id: user._id,

              name: user.name,

              email: user.email

          }

      });

  }

  catch (error) {

      res.status(500).json({

          message: error.message

      });

  }

});


// ==============================
// LOGIN
// ==============================

router.post("/login", async (req, res) => {

  try {

      const { email, password } = req.body;

      if (!email || !password) {

          return res.status(400).json({

              message: "Email and password are required."

          });

      }

      const user = await User.findOne({ email });

      if (!user) {

          return res.status(400).json({

              message: "User not found."

          });

      }

      const isMatch = await bcrypt.compare(

          password,

          user.password

      );

      if (!isMatch) {

          return res.status(400).json({

              message: "Incorrect password."

          });

      }

      const token = jwt.sign(

          {

              userId: user._id

          },

          process.env.JWT_SECRET,

          {

              expiresIn: "7d"

          }

      );

      res.json({

          message: "Login Successful",

          token,

          user: {

              id: user._id,

              name: user.name,

              email: user.email

          }

      });

  }

  catch (error) {

      res.status(500).json({

          message: error.message

      });

  }

});


// ==============================
// PROFILE
// ==============================

router.get("/profile", protect, (req, res) => {

  res.json({

      user: req.user

  });

});

module.exports = router;