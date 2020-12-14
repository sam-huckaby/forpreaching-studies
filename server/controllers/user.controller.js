const User = require('../database/models/user.model');

// We will use this method to create our user when a registration hook is fired in Auth0
// It will simply accept a user object and generate a new user document in our data store
registerNewUser = (req, res) => {
    // The gatekeeper. (in case they get past the IP filter)
    if(req.query.apiKey !== '7687f5ytvybuni7g675fcrtjyuni7867v5ytjyunih7g867f5ytvbyunh7g68futvybuno8h78g6f5tyvybuno8h79867f5t') {
        return res.status(401).json({
            success: false,
            message: 'I\'m not sure how you got here, friend. But I\'m sure you don\'t belong.'
        });
    }

    // Look to see if they're in the DB already
    User.findOne({ email: req.body.email }, (err, user) => {
        // If we failed the lookup, just get out of there
        if(err) {
            return res.status(400).json({
                success: false,
                error: 'Failed on user lookup',
            });
        }

        // If the user is already created, just move on
        if(user) {
            return res.status(200).json({
                success: true,
                error: 'User exists in the system',
            });
        }

        // The information from Auth0 is placed in the body for us to use
        // TODO: We might be able to configure some Auth0 rules to get us more data
        const userData = {
            email: req.body.email,
            registerDate: new Date(req.body.signed_up_at * 1000)
        };

        // If there is no email, then there is no user and nothing to do here.
        if (!userData.email) {
            return res.status(400).json({
                success: false,
                error: 'Incomplete user data was provided',
            });
        }

        // Create the user document (The model instance that will be saved to the DB)
        const newUser = new User(userData);
        // Check if the document was actually instantiated
        if (!newUser) {
            // Something was missing from the user object, so it could not be created
            return res.status(400).json({ success: false, message: 'User could not be created.' });
        }

        // Attempt to save the user document to the database
        newUser
            .save()
            .then(() => {
                // User was saved, ESCAPE
                return res.status(200).json({
                    success: true,
                    id: newUser._id,
                    message: 'User created!',
                });
            })
            .catch(error => {
                console.log("User registration from Auth0 failed. Details:");
                console.log(error);
                // we failed to save the user, ESCAPE
                return res.status(500).json({
                    error,
                    message: 'User not created!',
                });
            });
    });
}

updateUser = (req, res, next) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        if(err) {
            return res.status(500).json({
                success: false,
                message: err
            });
        }

        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User could not be found to be updated.'
            });
        }

        // TODO: swap back to !==
        if(req.user.email !== user.email) {
            return res.status(403).json({
                success: false,
                message: 'User does not have permission to update.'
            });
        }

        // TODO: For the moment, email is how we connect Mongo and Auth0 (so we should not update it)
        //user.email = req.body.email;

        // Expects something like...
//        {
//            "make": "Ford",
//            "model": "F-250",
//            "color": "white"
//        }
        user.vehicles = [
            {
                make: req.body.vehicleMake,
                model: req.body.vehicleModel,
                color: req.body.vehicleColor
            }
        ];

        user.save().then(
            () => {
                // Yayyy, updated!
                return res.status(200).json({
                    success: true,
                    message: 'User updated.'
                });
            },
            (err) => {
                // Boooo, failed!
                return res.status(500).json({
                    success: false,
                    message: 'User could not be updated.'
                });
            }
        );
    });
}

getUser = (req, res, next) => {
    // Look to see if they're in the DB already
    User.findOne({ email: req.query.email }, (err, user) => {
    console.log(user);
        // If we failed the lookup, just get out of there
        if(err) {
            return res.status(400).json({
                success: false,
                error: 'Failed on user lookup',
            });
        }

        // If the user is already created, just move on
        if(!user) {
            return res.status(404).json({
                success: false,
                error: 'User does not exist in the system',
            });
        }

        return res.status(200).json({
            success:true,
            user: user
        })
    });
}

module.exports = {
    registerNewUser,
    updateUser,
    getUser
};