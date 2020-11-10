const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

function signToken(userID) {
    const payload = {
        iss: "Maxx",
        sub: userID
    }
    const secretOrKey = "wpxstaqmylttzertaowundbpvzispjbvvceqngqkcphosjevaonmhedpjtiwcynp";  // matches secretOrKey in passport.js. (generated with https://maxx105.github.io/password_generator/)
    return JWT.sign(payload, secretOrKey);  
}

userRouter.post('/register', (req,res) =>{
    const { username, password, first_name, last_name, email } = req.body;
    User.findOne({username}, function(err, user) {
        if (err) {
            res.json({message: "Error has occurred", error: true});
        }
        if (user) {
            res.json({message: "Username is already taken", error: true});
        }
        else {
            const newUser = new User({username, password, email, first_name, last_name});
            newUser.save(err => {
                if(err)
                    res.json({message: "Error has occurred", error: true});
                else   
                    res.json({message: "Account successfully created", error: false});
            });
        }
    });
});

// for testing and seeing all users in database
userRouter.get('/register', function(req,res) {
    User.find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
});

userRouter.post('/login', passport.authenticate('local',{session:false}), (req,res) =>{
    if(req.isAuthenticated()) {
        const {_id,username} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.json({isAuthenticated: true, user: {username}});
    }
});

userRouter.get('/logout', passport.authenticate('jwt',{session:false}), function(req,res) {
    res.clearCookie('access_token');
    res.json({user: {username: ""}, success: true});
});

// have to be logged in to create an item
userRouter.post('/item', passport.authenticate('jwt',{session:false}), function(req,res) {
    const item = new Item(req.body);
    item.save(err => {
        if (err) {
            res.json({message: "Error has occurred", error: true});
        }
        else {
            req.user.items.push(item);
            req.user.save(err=>{
                if(err) {
                    res.json({message: "Error has occurred", error: true});
                }
                else {
                    res.json({message: "Successfully created item", error: false});
                }
            })
        }
    })
});

userRouter.get('/items', passport.authenticate('jwt',{session:false}), function(req,res) {
    User.findById({_id: req.user._id}).populate('items').exec((err,document) => {
        if(err) {
            res.json({message: "Error has occurred", error: true});
        }
        else {
            res.json({items: document.items, authenticated: true});
        }
    })
});

userRouter.get('/authenticated', passport.authenticate('jwt',{session:false}), (req,res) =>{
    const {username} = req.user;
    res.json({isAuthenticated: true, user: {username}});
});

module.exports = userRouter;