const express = require('express');
const ipfilter = require('express-ipfilter').IpFilter;
const jwtAuthz = require('express-jwt-authz');

// Use this to check the scopes available on the user's token, so we can scope individual routes
//const checkScopes = jwtAuthz([ 'read:messages' ]);

const UserCtrl = require('../controllers/user.controller');

const router = express.Router();

router.put('/user/:id', UserCtrl.updateUser);

router.get('/user', UserCtrl.getUser);

module.exports = router;