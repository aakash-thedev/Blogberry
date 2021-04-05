const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.get('/test', homeController.test);


// export the routers to server
module.exports = router;