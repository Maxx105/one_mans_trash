const Message = require("../models/Message");

module.exports = {
  findAll: function (req, res) {
    Message.find(req.query)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    Message
        .findById(req.params.id)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    const message = new Message(req.body);
    message.save((err) => {
      if (err) {
        res.json({ message: "Error has occurred", error: true });
      } else {
        req.user.sentMessages.push(message);
        req.user.save((err) => {
          if (err) {
            res.json({ message: "Error has occurred", error: true });
          } else {
            res.json({ message: "Successfully sent message", error: false });
          }
        });
      }
    });
  }
};
