const User = require("../database/models/user.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Auth0Strategy = require('passport-auth0');

// Go load environment variables
require('dotenv').config();

// Return the identifier used to rehydrate the user (to be stored in the session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Rehydrate a user using the serialized value (their id)
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Login strategy. Expects a POST request with a body payload similar to:
//{
//    "email": "samhuckaby+testing3@gmail.com",
//    "password": "password"
//}
passport.use('local-auth', new LocalStrategy({
    usernameField: "email",
    passwordField : 'password',
    passReqToCallback : false
}, (email, password, done) => {
        // Match User
        User.findOne({ 'local.email': email })
            .then(user => {
                // Check if the user exists, if not reject
                if (!user) {
                    return done(null, false, { message: 'Login Failed' });
                } else {
                    user.validatePassword(password).then(
                        isMatch => {
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, { message: "Login Failed" });
                            }
                        }
                    );
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })
);

// Expects a POST request with a body payload that looks similar to this:
//{
//	"email": "samhuckaby+testing3@gmail.com",
//	"password": "password",
//	"name": {
//		"first": "James",
//		"middle": "Samuel",
//		"last": "Huckaby"
//	},
//	"phoneNumber": 1234567890,
//	"birthday": {
//		"year": 1990,
//		"month": 8,
//		"day": 9
//	},
//	"vehicles": [
//		{
//            "make": "Ford",
//            "model": "F-250",
//            "year": 2003,
//            "color": "white"
//        },
//        {
//            "make": "Dodge",
//            "model": "Durango",
//            "year": 2013,
//            "color": "gray"
//        }
//	]
//}
passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField : 'password',
    passReqToCallback : true // Pass the req, so we can use the body
}, (req, email, password, done) => {
    // Match User
    User.findOne({ 'local.email': email }, (err, user) => {
        // Check if the user exists, if not reject
        if (user) {
            return done(null, false, { message: 'That email address is already in use' });
        } else {
            // Grab the user being registered from the body
            let userToRegister = req.body;

            // Set the auth settings to their proper place
            userToRegister.local = {
                email: userToRegister.email,
                password: userToRegister.password
            }
            // Remove email/password from their default locations
            delete userToRegister.email;
            delete userToRegister.password;

            // Create the new user document (in-memory only)
            let newUser = User(userToRegister);
            // Reset the password to a hashed version
            newUser.setPassword(userToRegister.local.password);

            // Do the DB save of the new user
            newUser.save()
                .then(savedNewUser => {
                    return done(null, savedNewUser);
                })
                .catch(saveErr => {
                    return done(null, false, { message: saveErr, type: 'Saving failure' });
                });
        }
    })
    .catch(err => {
        return done(null, false, { message: err, type: 'database lookup failure' });
    });
}));

// I THINK this strategy routes people to our Auth0 Universal Login, which I don't know that we need right now.
passport.use('Auth0', new Auth0Strategy({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
));

module.exports = passport;