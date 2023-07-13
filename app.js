require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const taskRouter = require('./routes/taskRoutes')
const authRouter = require('./routes/authRoutes')
const authController = require('./controllers/authController')
const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

app.use(express.json()) // for parsing application/json
app.use('/tasks', taskRouter)

app.use(session({
  secret: 'keyboard cat', // Change this secret to a long, complex random string!
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI 
  })
}));

app.use(authController.passport.initialize())
app.use(authController.passport.session())

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app

