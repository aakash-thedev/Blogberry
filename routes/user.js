const express = require('express');
// create router
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/user_controller');

router.get('/', function(req, res) {
    return res.end('<h1> USERS </h1>');
});

// only visit profile when user is logged in already for that we will use middleware
router.get('/profile', passport.checkAuthentication , userController.profile);

// create user
router.post('/create', userController.create);

// create session
router.post('/create-session', passport.authenticate('local', {failureRedirect : '/sign-in'}), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;