const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timeStamp: true },
);

const UserSchema = mongoose.model("UserSchema", userSchema);
module.exports = UserSchema;
