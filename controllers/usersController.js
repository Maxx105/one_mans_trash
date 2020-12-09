const User = require("../models/User");

module.exports = {
  findAll: function (req, res) {
    User.find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findOneThenSave: function (req, res) {
    const { username } = req.body;
    User.findOne({ username }, function (err, user) {
      if (err) {
        res.json({ message: "Error has occurred", error: true });
      }
      if (user) {
        res.json({ message: "Username is already taken", error: true });
      } else {
        const newUser = new User(req.body);
        newUser.save((err) => {
          console.log(err);
          if (err) res.json({ message: "Error has occurred", error: true });
          else
            res.json({ message: "Account successfully created", error: false });
        });
      }
    }).catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function(req, res) {
    User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    const conversation = new Conversation(req.body);
    User
      .findByIdAndUpdate(req.body._id,
        { "$push": { "conversation": conversation._id } },
        { "new": true, "upsert": true },
        function (err, res) {
            if (err) throw err;
            // console.log(res);
        }
    );
  }
};
