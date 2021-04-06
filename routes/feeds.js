const express = require('express');

// create a router
const router = express.Router();

const feedsController = require('../controller/feeds_controller');

// create a request
router.get('/newFeeds', feedsController.fetchFeeds);

module.exports = router;