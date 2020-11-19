const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');
const JWT = require('jsonwebtoken');
const usersController = require("../../controllers/usersController");
const itemsController = require("../../controllers/itemsController");
const path = require("path");
const multer = require("multer");
const User = require('../../models/User');
const Item = require('../../models/Item');

function signToken(userID) {
    const payload = {
        iss: "Maxx",
        sub: userID
    }
    const secretOrKey = "wpxstaqmylttzertaowundbpvzispjbvvceqngqkcphosjevaonmhedpjtiwcynp";  // matches secretOrKey in passport.js. (generated with https://maxx105.github.io/password_generator/)
    return JWT.sign(payload, secretOrKey);  
}

router.route('/register')
    .get(usersController.findAll)
    .post(usersController.findOneThenSave)

router.route("/user/:id")
    .get(usersController.findById)

router.route("/allItems/:id")
    .get(itemsController.findById)
    .delete(itemsController.remove);

router.post('/login', passport.authenticate('local',{session:false}), (req,res) =>{
    if(req.isAuthenticated()) {
        const {_id,username} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.json({isAuthenticated: true, user: {username}, id: {_id}});
    }
});

router.get('/logout', passport.authenticate('jwt',{session:false}), function(req,res) {
    res.clearCookie('access_token');
    res.json({user: {username: ""}, success: true});
});

// have to be logged in to create an item
router.post('/allItems', passport.authenticate('jwt',{session:false}), function(req,res) {
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

// for testing and seeing all items in database
router.get('/allItems', function(req,res) {
    Item.find(req.query)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
});

router.get('/userItems', passport.authenticate('jwt',{session:false}), function(req,res) {
    User.findById({_id: req.user._id}).populate('items').exec((err,document) => {
        if(err) {
            res.json({message: "Error has occurred", error: true});
        }
        else {
            res.json({items: document.items, authenticated: true});
        }
    })
});

router.get('/authenticated', passport.authenticate('jwt',{session:false}), (req,res) =>{
    const {_id} = req.user
    const {username} = req.user;
    res.json({isAuthenticated: true, user: {username}, id: {_id}});
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
  })
  
const upload = multer({ storage: storage });

router.post('/upload', upload.single('photo'), function (req, res, next) {
    res.json({
        originalName: req.file.originalname,
        destination: req.file.destination,
        filename: req.file.filename,
        path: req.file.path
    })
  });

module.exports = router;