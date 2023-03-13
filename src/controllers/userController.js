const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, age, gender, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document with the hashed password
      const newUser = new userModel({ name, email, password: hashedPassword, age, gender,});
      await newUser.save();
      return res.status(201).json({ status: true, message: "Account Created" });
    } 
    catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (Object.keys(req.body).length == 0) {
        return res.status(400).send({
          status: false,
          message: "Please provide email and password for signing in.",
        });
      }

      if (req.body.email) {
        req.body.email = req.body.email.toString();
      }
      if (req.body.password) {
        req.body.password = req.body.password.toString();
      }
      // validation starts

      if (!req.body.email || !req.body.password) {
        return res.status(400).send({
          status: false,
          message: "both fields are required to sign in.",
        });
      }

      // Checking if the user already exists in Db or not
      const userCheck = await userModel.findOne({ email: email });
      if (!userCheck)
        return res
          .status(404)
          .json({
            status: false,
            message:
              "you are not registered. first signup then try to sign in again.",
          });
      // CHECKING THE PASSWORD
      let passwordCheck = await bcrypt.compare(password, userCheck.password);
      if (!passwordCheck)
        return res.status(400).send({ status: false, message: "Incorrect Password" });

      // Create a JWT token with the user's ID and send it in the response
      const token = jwt.sign({ userId: userCheck._id }, "secret");
      return res.status(200).json({ message: "User logged In", token: token });
    } 
    catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};
