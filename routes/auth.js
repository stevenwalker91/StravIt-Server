const express = require('express');
const router = express.Router();
const passport = require('passport');
const SUCCESS_URL = 'http://localhost:3000'

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user authenticated',
      user: req.user, 
      cookies: req.cookies
    })
  }
})

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'auth failed'
  })
})

router.get('/strava', passport.authenticate('strava', { scope: ['read_all'] }));

router.get('/strava/callback', passport.authenticate('strava', { 
  successRedirect: SUCCESS_URL,
  failureRedirect: '/auth/login/failed' 
  })
);






module.exports = router;
