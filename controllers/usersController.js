const User = require("../models/User");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    User
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
  },
  findOneThenSave: function(req, res) { 
    const { username } = req.body; 
    User
        .findOne({username}, function(err, user) {
            if (err) {
                res.json({message: "Error has occurred", error: true});
            }
            if (user) {
                res.json({message: "Username is already taken", error: true});
            } else {
                const newUser = new User(req.body);
                newUser.save(err => {
                    console.log(err)
                    if(err)
                        res.json({message: "Error has occurred", error: true});
                    else   
                        res.json({message: "Account successfully created", error: false});
                });
            }
        })
        .catch(err => res.status(422).json(err))
  }
//   create: function(req, res) {
//     User
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     User
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     User
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};
