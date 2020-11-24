const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey:
    "wpxstaqmylttzertaowundbpvzispjbvvceqngqkcphosjevaonmhedpjtiwcynp",
};

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById({ _id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      user.comparePassword(password, done);
    });
  })
);
