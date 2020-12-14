const express = require('express');
const jwtAuthz = require('express-jwt-authz');

// Use this to check the scopes available on the user's token, so we can scope individual routes
//const checkScopes = jwtAuthz([ 'read:messages' ]);

const BusinessCtrl = require('../controllers/business.controller');

const router = express.Router();

// Create a business, expects a post request with a body payload similar to:
//{
//    "name": "Charlie's Chocolate Factory",
//    "address": "555 Chocolate Lane",
//    "telephone": "1-800-555-7600",
//    "category": "Food & Drink",
//    "hours": [
//        "9-5",
//        "9-5",
//        "9-5",
//        "9-5",
//        "9-5",
//        "9-5",
//        "6-2"
//    ]
//}
router.post('/business', BusinessCtrl.createBusiness);

router.put('/business/:id', BusinessCtrl.updateBusiness);
router.delete('/business/:id', BusinessCtrl.deleteBusiness);
router.get('/business/:id', BusinessCtrl.getBusinessById);
router.get('/businesses', BusinessCtrl.getBusinesses);

module.exports = router;