const express = require('express');

const router = express.Router();
const post_controller = require('../controller/post_controller');

router.post('/create-post', post_controller.createPost);

module.exports = router;