const express = require('express');
const router = express.Router();
const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
require('dotenv').config()

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new StravaStrategy({
  clientID: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/strava/callback"
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    
    // To keep the example simple, the user's Strava profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Strava account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));

router.get('/strava', passport.authenticate('strava', { scope: ['read_all'] }), function(req, res){
    // The request will be redirected to Strava for authentication, so this
    // function will not be called.
  });

router.get('/strava/callback', 
passport.authenticate('strava', { failureRedirect: '/' }),
function(req, res) {
  res.redirect('/auth/yes');
});

router.get('/yes', function(req, res) {
  if(req.user) (
    console.log(req.user)
  )
  res.redirect('/');
})

module.exports = router;
