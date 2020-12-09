const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
    message: {
        type: Array
    }
});

module.exports = mongoose.model("Conversation", ConversationSchema);