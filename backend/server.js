const express = require('express')
const {port,session_key_secret} = require('./config')
const app = express()
const apiRouter = require('./routes/api')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

require('./db/mongoose')

app.use(session ({
    secret: '8d6fb8df7bdfbf9d8bdf9b',
    saveUninitialized: true,
    cookie: { maxAge:1000 * 60 * 60 * 24 * 1 },
    resave: false,
}))

app.use(cors())

app.use('/',require('./middleware/view-variables'))
app.use('/login',require('./middleware/user-middleware'))

app.use(bodyParser.json())
app.use('/', apiRouter)

app.use(cookieParser())

app.listen(port, () => {
    console.log(`Serwer działa na porcie : ${port}`)
})