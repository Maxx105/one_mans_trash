const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String
  },
  toUserID: {
    type: String
  },
  toUsername: {
    type: String
  },
  fromUserID: {
    type: String
  },
  fromUsername: {
    type: String
  },
  item: {
    type: String
  },
  itemID: {
    type: String
  },
  conversationID: {
    type: Number
  }
});

module.exports = mongoose.model("Message", MessageSchema);
