const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user_controller');
const isAuth = require('../middleware/isAuth');

/* GET users listing. */
router.get('/dashboard', isAuth, user_controller.getDashboard);

module.exports = router;