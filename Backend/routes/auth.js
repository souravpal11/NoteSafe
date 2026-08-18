// const express = require("express");
// const User = require("../models/User");
// const router = express.Router();
// const { body, validationResult } = require("express-validator");
// const { message } = require("statuses");

// //create a User Using: PORT"/api/auth/createUser"
// router.post(
//   "/createUser",
//   [
//     body("name", "Enter a valid Name").isLength({ min: 2 }),
//     body("password", "Password must be atleast 4 characters").isLength({
//       min: 4,
//     }),
//     body("email", "Enter a valid Email").isEmail(),
//   ],
//   async (req, res) => {
// // If there are errors,return Bad requets and errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
// // Check weather the user with this email exists already
//     let existingUser = await User.findOne({
//   email: req.body.email,
// });
//     if(user){
//         return res.status(400).json({ errors: "User with this Email already exists" });
//     }
//     user = await User.create({
//       name: req.body.name,
//       password: req.body.password,
//       email: req.body.email,
//     })
//     //   .then((user) => res.json(user))
//     //   .catch((err) => {
//     //     console.log(err);
//     //     res.json({ error: 'The given Email is already Registered',message: err.message});
//     //   });
//   },
// );

// module.exports = router;

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "SouravPal800111";
//ROUTE-1: Create a User: POST "/api/auth/createUser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 2 }),
    body("password", "Password must be at least 4 characters").isLength({
      min: 4,
    }),
    body("email", "Enter a valid Email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;

    // If there are validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the user already exists
      let existingUser = await User.findOne({
        email: req.body.email,
      });

      if (existingUser) {
        return res.status(400).json({
          error: "User with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });

      // res.status(201).json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

//ROUTE-2: Authenticate a User: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    let success = false;
    // If there are validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res.status(400).json({ success, error: "Invalid Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
    res.json({ success, authToken })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  },
);

// //ROUTE-3: Get logged in User detail using: POST "/api/auth/getuser" Login required
// router.post("/getuser",fetchuser,async (req, res) => {
//     try {
//       const userId = req.user.id;
//       const user = await User.findById(userId).select("-password")
//       res.send(user)
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   },
// );
// ROUTE-3: Get logged in User detail
// GET "/api/auth/getuser"
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
