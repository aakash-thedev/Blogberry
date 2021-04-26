const express = require('express');
const passport = require('passport');
const router = express.Router();

const commentController = require('../controller/comment_controller');

router.post('/create-comment', passport.checkAuthentication , commentController.createComment);

module.exports = router;