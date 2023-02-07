const { Schema, model } = require("mongoose");

// REGEX CHECK VIA FUNCTION
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // REGEX CHECK EITHER VIA FUNCTION OR BY MATCH. THE TWO ARE REDUNDANT
      email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validateEmail, 'Please fill a valid email address'],
      // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    pet: {
      type: String,
      enum: ["dog", "cat"],
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
