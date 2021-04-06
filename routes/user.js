const express = require('express');

// create router
const router = express.Router();

const userController = require('../controller/user_controller');

router.get('/', function(req, res) {
    return res.end('<h1> USERS </h1>');
});

router.get('/profile', userController.profile);
router.get('/posts', userController.posts);

module.exports = router;