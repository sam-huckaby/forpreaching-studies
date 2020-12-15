const express = require('express');

const IllustrationCtrl = require('../controllers/illustration.controller');

const router = express.Router();

router.get('/topten', IllustrationCtrl.getTopTenIllustrations);

module.exports = router;