const express = require('express');

const router = express.Router();

const users_api = require('../../../controller/api/v1/users_api');

router.post('/create-session', users_api.createSession);

module.exports = router;