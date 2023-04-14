const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
  
    res.render('index', { title: 'StravIt', loggedIn: true, user: req.user });
  } else {
    res.render('index', { title: 'StravIt', loggedIn: false });
  }

  
  
});

module.exports = router;
