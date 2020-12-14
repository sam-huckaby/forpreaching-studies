const express = require('express');
// const jwtAuthz = require('express-jwt-authz');

// Use this to check the scopes available on the user's token, so we can scope individual routes
//const checkScopes = jwtAuthz([ 'read:messages' ]);

const IllustrationCtrl = require('../controllers/illustration.controller');

const router = express.Router();

router.post('/', IllustrationCtrl.createIllustration);

// router.put('/user/:id', IllustrationCtrl.updateUser);

// router.get('/user', IllustrationCtrl.getUser);

module.exports = router;