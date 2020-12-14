const express = require('express');
const ipfilter = require('express-ipfilter').IpFilter;
const passport = require('passport');

const UserCtrl = require('../controllers/user.controller');

const router = express.Router();

//router.post('/register', (req, res, next) => {
//    passport.authenticate("local-signup", function(err, user, info) {
//        // Catch unexpected errors
//        if (err) {
//            return res.status(500).json({ errors: err });
//        }
//        // Determine if the user failed to be signed up
//        if (!user) {
//            return res.status(401).json({ errors: "Registration failed", info: info });
//        }
//
//        // login the user and head out
//        req.login(user, function(err) {
//            // If something happened while logging in
//            if (err) {
//                return res.status(500).json({ errors: err });
//            }
//            return res.status(200).json({ success: `logged in ${user.local.email}` });
//        });
//    })(req, res, next);
//});
//
//router.post('/login', (req, res, next) => {
//    passport.authenticate("local-auth", function(err, user, info) {
//            // If something happened in user lookup
//            if (err) {
//                return res.status(500).json({ errors: err });
//            }
//            if (!user) {
//                return res.status(401).json({ errors: "Login failed" });
//            }
//            req.login(user, function(err) {
//                // If something happened while logging in
//                if (err) {
//                    return res.status(500).json({ errors: err });
//                }
//                return res.status(200).json({ success: `logged in ${user.local.email}` });
//            });
//        })(req, res, next);
//});
//
//router.get('/logout', (req, res) => {
//    req.logout();
//    res.redirect('/');
//});

// All Auth0 user registration requests should come from one of these IPs:
const whitelist_ips = [
    '35.167.74.121',
    '35.166.202.113',
    '35.160.3.103',
    '54.183.64.135',
    '54.67.77.38',
    '54.67.15.170',
    '54.183.204.205',
    '35.171.156.124',
    '18.233.90.226',
    '3.211.189.167',
    '18.232.225.224',
    '34.233.19.82',
    '52.204.128.250',
    '3.132.201.78',
    '3.19.44.88',
    '3.20.244.231',
    '::1' // <-- Allow requests from the inside (for development)
];

let clientIp = function(req, res) {
    return req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : ""
}

// This route is used by Auth0 ONLY.
router.put('/user/registration', ipfilter(whitelist_ips, { mode: 'allow', trustProxy: true }), UserCtrl.registerNewUser);

module.exports = router;