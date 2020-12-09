const Conversation = require("../models/Conversation");

module.exports = {
    findAll: function (req, res) {
        Conversation.find(req.query)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    findById: function (req, res) {
        Conversation
            .findById(req.params.id)
            .then((dbModel) => res.json(dbModel))
            .catch((err) => res.status(422).json(err));
    },
    update: function(req, res) {
        console.log(req.body)
        Conversation
            .findByIdAndUpdate( {_id: req.body._id },
            { "$push":  {"message": req.body.message} })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
