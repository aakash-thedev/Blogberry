const express = require('express');
const passport = require('passport');

const router = express.Router();
const post_controller = require('../controller/post_controller');

router.post('/create-post', passport.checkAuthentication , post_controller.createPost);

module.exports = router;