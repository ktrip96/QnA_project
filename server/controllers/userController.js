const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username, password, passwordVerify } = req.body;

      // validation

      if (!email || !password || !passwordVerify || !username)
        return res.status(400).json({
          success: 0,
          message: "Please enter all required fields.",
        });

      if (password.length < 6)
        return res.status(400).json({
          success: 0,
          message: "Please enter a password of at least 6 characters.",
        });

      if (password !== passwordVerify)
        return res.status(400).json({
          success: 0,
          message: "Please enter the same password twice.",
        });

      const existingEmail = await User.findOne({ email });
      if (existingEmail)
        return res.status(400).json({
          success: 0,
          message: "An account with this email already exists.",
        });

      const existingUser = await User.findOne({ username });
      if (existingUser)
        return res.status(400).json({
          success: 0,
          message: "An account with this username already exists.",
        });

      // Hash the password
      // Salt is a random string which is generated in order for the password to be hashed

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      // Save the user

      const newUser = new User({
        email,
        passwordHash,
        username,
      });
      const savedUser = await newUser.save();

      // Log the user in

      const token = jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.JWT_SECRET
      );

      // send the token in a HTTP only cookie

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .json({ success: 1, message: "User created" });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  login: async (req, res) => {
    try {
      const { password, username } = req.body;

      if (!username || !password)
        return res
          .status(400)
          .json({ success: 0, message: "Please enter all required fields." });

      // check if the user exists

      const existingUser = await User.findOne({ username });

      // if not return 401

      if (!existingUser)
        return res
          .status(401)
          .json({ success: 0, message: "Wrong username or password" });

      // Else, compare the given password with the stored hashed password
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      );

      if (!passwordCorrect)
        return res
          .status(401)
          .json({ success: 0, message: "Wrong username or password" });

      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.JWT_SECRET
      );

      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .json({ success: 1, message: "Logged In Successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  },

  logout: (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        success: 1,
        message: "Logged Out",
      });
  },

  isLoggedIn: (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) return res.send(false);
      jwt.verify(token, process.env.JWT_SECRET);

      res.send(true);
    } catch (err) {
      res.send(false);
    }
  },

  getUserData: async (req, res) => {
    const user = await User.findById(req.user);

    // if not return 401
    if (!user)
      return res.status(401).json({ success: 0, message: "Unknown user" });

    return res.status(200).json({
      success: 1,
      data: {
        username: user.username,
        email: user.email,
        numberOfQuestions: user.numberOfQuestions,
        numberOfAnswers: user.numberOfAnswers,
        numberOfLikes: user.numberOfLikes,
      },
    });
  },

  deleteUser: async (req, res) => {
    const user = await User.findByIdAndDelete(req.user);
    // if not return 401
    if (!user) return res.status(401).json({ errorMessage: "Unknown user" });
    // logout
    return res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(200)
      .json({
        success: 1,
        message: "User deleted successfully",
      });
  },
};
