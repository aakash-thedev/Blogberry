const express = require('express');

const router = express.Router();
const likesController = require('../controller/likes_controller');

router.get('/toggle/', likesController.toggleLikes);

module.exports = router;