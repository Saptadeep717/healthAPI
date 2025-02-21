const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  const { name,email,password } = req.body;

  if (!name || !password || !email) {
    return res.status(403).send({
      success: false,
      message: "All fields are required",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be atleast 6 characters.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const isSameUser = await bcrypt.compare(password, existingUser.password);

      if (isSameUser) {
        return res.status(400).json({
          success: false,
          message: "You are already registered. Please login instead.",
        });
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Email already exists. Please login or try a different one.",
        });
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: `Please Fill up All the Required Fields, username and password`,
    });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          name: user.name,
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      user.token = token;
      user.password = undefined;
      res
        .status(200)
        .json({ success: true, token, user, message: `User Login Success` });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

