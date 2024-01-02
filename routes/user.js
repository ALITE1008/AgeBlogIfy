const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signup', async (req, res) => {

  const { fullName, email, password } = req.body;
  try {
    await User.create({
      fullName: fullName,
      email: email,
      password: password,
    })
    return res.redirect('/user/signin');
  } catch (error) {
    return res.render('signup', {
      err: " Email Already Exist Please Try To Signin",
    });
  }
 
});

router.post('/signin', async (req, res) => {

  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGentrateToken(email, password);

    return res.cookie('token', token).redirect('/');

  } catch(error) {
    return res.render('signin', {
      err: "Invaild Email or Password",
    });
  }

});



module.exports = router;