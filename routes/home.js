const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
const { authenticated } = require('../config/auth')

router.get('/', (req, res) => {
  res.send('hello world')
})

module.exports = router