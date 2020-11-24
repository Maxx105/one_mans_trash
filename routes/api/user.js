const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../../passport");
const JWT = require("jsonwebtoken");
const usersController = require("../../controllers/usersController");
const itemsController = require("../../controllers/itemsController");
const path = require("path");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();
const User = require("../../models/User");
const Item = require("../../models/Item");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  Bucket: process.env.S3_BUCKET_NAME,
});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "one-mans-treasure-images",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("photo");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/upload", (req, res) => {
  profileImgUpload(req, res, (error) => {
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location; // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
});

function signToken(userID) {
  const payload = {
    iss: "Maxx",
    sub: userID,
  };
  const secretOrKey =
    "wpxstaqmylttzertaowundbpvzispjbvvceqngqkcphosjevaonmhedpjtiwcynp"; // matches secretOrKey in passport.js. (generated with https://maxx105.github.io/password_generator/)
  return JWT.sign(payload, secretOrKey);
}

router
  .route("/register")
  .get(usersController.findAll)
  .post(usersController.findOneThenSave);

router.route("/user/:id").get(usersController.findById);

router
  .route("/allItems/:id")
  .get(itemsController.findById)
  .delete(itemsController.remove);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.json({ isAuthenticated: true, user: { username }, id: { _id } });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
  }
);

// have to be logged in to create an item
router.post(
  "/allItems",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    const item = new Item(req.body);
    item.save((err) => {
      if (err) {
        res.json({ message: "Error has occurred", error: true });
      } else {
        req.user.items.push(item);
        req.user.save((err) => {
          if (err) {
            res.json({ message: "Error has occurred", error: true });
          } else {
            res.json({ message: "Successfully created item", error: false });
          }
        });
      }
    });
  }
);

// for testing and seeing all items in database
router.get("/allItems", function (req, res) {
  Item.find(req.query)
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
});

router.get(
  "/userItems",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    User.findById({ _id: req.user._id })
      .populate("items")
      .exec((err, document) => {
        if (err) {
          res.json({ message: "Error has occurred", error: true });
        } else {
          res.json({ items: document.items, authenticated: true });
        }
      });
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id } = req.user;
    const { username } = req.user;
    const { photo } = req.user;
    res.json({
      isAuthenticated: true,
      user: { username },
      id: { _id },
      photo: { photo },
    });
  }
);

// If no API routes are hit, send the React app
router.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
