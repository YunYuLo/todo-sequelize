const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
  let errors = []
  let errorMessage = req.flash('error')[0]
  if (errorMessage) {
    errors.push({ message: 'Email or Password incorrect!' })
  }
  res.render('login', { errors })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
})


//Register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body

  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: 'Email, Password and Confirm Password can not be blank.' })
  }

  if (password != password2) {
    errors.push({ message: 'Password incorrect, Please check.' })
  }

  if (errors.length > 0) {
    res.render('register', ({ errors, name, email, password, password2 }))
  } else {
    User.findOne({ where: { email: email } })
      .then(user => {
        if (user) {
          errors.push({ message: 'This email address is already used.' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash

              newUser.save()
                .then(user => { res.redirect('/') })
                .catch(err => console.log(err))
            })
          })
        }
      })
  }


})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Success logout!')
  res.redirect('/users/login')
})

module.exports = router