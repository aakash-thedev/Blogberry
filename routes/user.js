const express = require('express');

// create router
const router = express.Router();

const userController = require('../controller/user_controller');

router.get('/', function(req, res) {
    return res.end('<h1> USERS </h1>');
});

router.get('/profile', userController.profile);
router.get('/posts', userController.posts);
router.get('/sign-up', userController.signup);
router.get('/sign-in', userController.signin);
router.get('/create', userController.create);

module.exports = router;