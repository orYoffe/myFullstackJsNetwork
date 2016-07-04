var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  Users.find()
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    name: req.body.name,
    password: req.body.password,
    admin: req.body.admin
  };

  var data = new Users(item);
  data.save(function (err) {
    if (err) console.error('error, no entry found');;
    // saved!
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  Users.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.name;
    doc.password = req.body.password;
    doc.admin = req.body.admin;
    doc.save(function (err) {
      if (err) console.error('error, no entry found');;
      // saved!
    });;
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  Users.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
