const express = require('express');

const user_auth_controller = require('../../controllers/auth/user_auth');

const router = express.Router();

router.get('/login', user_auth_controller.getLogin);

router.post('/login', user_auth_controller.postLogin);
module.exports = router;