const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('index', { title: 'Logged in' });
  }
  console.log(req.user)
  res.render('index', { title: 'StravIt' });
  
});

module.exports = router;
