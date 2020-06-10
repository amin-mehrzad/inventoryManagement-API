const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require('../api/models/usersModel');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        UserModel.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, jwt_payload);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};