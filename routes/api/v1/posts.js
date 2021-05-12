const express = require('express');
const { session } = require('passport');
const passport = require('passport');
const router = express.Router();

const post_api = require('../../../controller/api/v1/posts_api');

router.get('/', post_api.index);
// to delete a post
router.delete('/:id', passport.authenticate('jwt', {session: false}), post_api.destroy);

module.exports = router;