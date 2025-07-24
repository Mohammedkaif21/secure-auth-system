const express = require('express')
const router = express.Router();
const AuthController = require('../controllers/authController.js');

router.post('/signup',AuthController.signup)
router.post('/login',AuthController.login)
router.post('/refresh-token',AuthController.refreshTokens)

module.exports = router;