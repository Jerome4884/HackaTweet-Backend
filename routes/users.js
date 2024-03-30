var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const uid2 = require('uid2');

require('../models/connection');
const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//ROUTE USER SIGN-UP 

router.post('/signup', (req, res) => {

  const hash = bcrypt.hashSync(req.body.password, 10);
  const token = uid2(32);

  //Is signup data valid ?
  if (!req.body.username || !req.body.password || !req.body.firstName) {
      res.json({ result:false, error:'Missing or empty field'})
      return;
  }

   //Does User already exit ?
   User.findOne({ username: req.body.username })
   .then(data => {
      if (data === null) {
          //User is not registered
          const newUser = new User({
              username: req.body.username,
              firstName: req.body.firstName,
              password: hash,
              token: token,
              // image: xxx,
              // tweets: xxx,
          })

          newUser.save().then(dataRep => {
            //reponse de la route, on renvoie l'username et le token
              res.json({ result:true, username: dataRep.username , token: dataRep.token });
          })
      } else {
          //User already exists
          res.json({ result:false, error: "User already exists" })
      }
   })
})

//POST/Signin
router.post('/signin', (req, res) => {

  if (!req.body.username || !req.body.password) {
      res.json({ result:false, error:'Missing or empty field' })
      return;
  }

  User.findOne({ username: req.body.username })
  .then(data => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
          //User is registered and signed in
          res.json({ result:true, action:'user is signed-in', token:data.token })
      } else {
          //User is not signed-in because not registered
          res.json({ result: false, error:'user is not recognized' })
      }
  });
});

module.exports = router;
