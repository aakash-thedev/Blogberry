//--------------- This Route is controlling all the other routes in the folder ------------------- //

const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');
const userController = require('../controller/user_controller');

console.log('router loaded');

router.get('/', homeController.home);

// ----------------- controlling other routes --------- //
router.use('/user', require('./user'));
router.use('/feeds', require('./feeds'));

router.use('/sign-up', require('./user'));
router.use('/sign-in', require('./user'));


// export the routers to server
module.exports = router;