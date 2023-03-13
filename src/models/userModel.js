const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 13,
    max: 120
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary'],
    required: true
  },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
