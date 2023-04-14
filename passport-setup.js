const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const axios = require('axios');
const User = require('./models/user-model')

require('dotenv').config()

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

passport.use(new StravaStrategy({
  clientID: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/strava/callback",
  passReqToCallback: true
},
   async (req, accessToken, refreshToken, params, profile, done) => {

    // check if user already exists
    const currentUser = await User.findOne({
      stravaId: profile.id
    });

    // user doesn't exist so create them
    if (!currentUser) {
      const newUser = await new User({
        name: profile.displayName,
        stravaId: profile.id,
        profilePicture: profile.photos[1].value,
        country: profile._json.country,
        role: 'user',
        accessToken: accessToken,
        tokenExpires: params.expires_at,
        refreshToken: refreshToken,
        scopes: req.query.scope
      }).save();
      if (newUser) {
        done(null, newUser);
      }
    }

    done(null, currentUser);
  }
  ));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  console.log(obj)
  User.findById(obj)
    .then(user => {
      done(null, user)
    })
    .catch(e => {
      done(new Error('Failed to deserialise the user'))
    })
});

