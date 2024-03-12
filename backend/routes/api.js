const express = require('express')
const userActions = require('../controllers/userData')

const router = express.Router()

router.get('/',userActions.view)
router.post('/user',userActions.register)
// logowanie
router.post('/login', userActions.login)
router.get('/login', userActions.login)
// wylogowanie
router.get('/logout',userActions.logout)

module.exports = router
