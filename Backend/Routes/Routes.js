const express = require('express');
const router = express.Router()
const apiControls = require('../Controller/Controller')

router.post('/register', apiControls.registerApi)
router.post('/login', apiControls.loginApi)

router.get('/logout', apiControls.logoutApi)


router.get('/all', apiControls.getAllUsers)


router.get('/:cookieId', apiControls.oneUser)

module.exports = router