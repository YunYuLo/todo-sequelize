const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const db = require('./models')
const Todo = db.Todo
const User = db.User

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//router
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', require('./routes/users'))

//express port
app.listen(3000, () => {
  console.log(`App is running on port 3000`)
})