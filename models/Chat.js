const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timeStamp: true },
);

module.exports = mongoose.Model("Chat", chatSchema);
