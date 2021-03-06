const express = require('express')
const router = express.Router()
const db = require('../models')
const User = db.User
const Todo = db.Todo
const { authenticated } = require('../config/auth')

// 新增一筆 Todo 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆  Todo
router.post('/', authenticated, (req, res) => {

  if (req.body.name == '') {
    req.flash('warning_msg', 'Title can not be blank.')
    res.render('new', {
      name: req.body.name,
      note: req.body.note,
    })
  } else {
    Todo.create({
      name: req.body.name,
      note: req.body.note,
      done: false,
      UserId: req.user.id
    })
      .then((todo) => { return res.redirect('/') })
      .catch((error) => { return res.status(422).json(error) })
  }


})

// 顯示一筆 Todo 的詳細內容
router.get('/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      return Todo.findOne({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.render('detail', { todo: todo }) })
    .catch((error) => { return res.status(422).json(error) })

})

// 修改 Todo 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")
      return Todo.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id,
        }
      })
    })
    .then((todo) => { return res.render('edit', { todo: todo }) })
})

// 修改 Todo
router.put('/:id', authenticated, (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((todo) => {
      todo.name = req.body.name
      todo.note = req.body.note
      todo.done = req.body.done === "on"

      return todo.save()
    })
    .then((todo) => { return res.redirect(`/todos/${req.params.id}`) })
    .catch((error) => { return res.status(422).json(error) })
})

// 刪除 Todo
router.delete('/:id/delete', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then((todo) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router