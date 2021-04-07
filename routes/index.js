//--------------- This Route is controlling all the other routes in the folder ------------------- //

const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('router loaded');

router.get('/', homeController.home);

// ----------------- controlling other routes --------- //
router.use('/user', require('./user'));
router.use('/feeds', require('./feeds'));


// export the routers to server
module.exports = router;