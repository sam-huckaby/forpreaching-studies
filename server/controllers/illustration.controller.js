const Illustration = require('../database/models/illustration.model');

// Create a new illustration in the DB
createIllustration = (req, res) => {
    // Create the illustration document (The model instance that will be saved to the DB)
    const newIllustration = new Illustration(req.body);
    // Check if the document was actually instantiated
    if (!newIllustration) {
        // Something was missing from the request object, so it could not be persisted
        return res.status(400).json({ success: false, message: 'Illustration could not be created.' });
    }

    // Attempt to save the illustration document to the database
    newIllustration
        .save()
        .then(() => {
            // Illustration was saved, ESCAPE
            return res.status(200).json({
                success: true,
                id: newIllustration._id,
                message: 'Illustration created!',
            });
        })
        .catch(error => {
            console.log("Illustration persistence failed. Details:");
            console.log(error);
            // we failed to save the illustration, ESCAPE
            return res.status(500).json({
                error,
                message: 'Illustration not created!',
            });
        });
}

// updateUser = (req, res, next) => {
//     User.findOne({ _id: req.params.id }, (err, user) => {
//         if(err) {
//             return res.status(500).json({
//                 success: false,
//                 message: err
//             });
//         }

//         if(!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User could not be found to be updated.'
//             });
//         }

//         // TODO: swap back to !==
//         if(req.user.email !== user.email) {
//             return res.status(403).json({
//                 success: false,
//                 message: 'User does not have permission to update.'
//             });
//         }

//         // TODO: For the moment, email is how we connect Mongo and Auth0 (so we should not update it)
//         //user.email = req.body.email;

//         // Expects something like...
// //        {
// //            "make": "Ford",
// //            "model": "F-250",
// //            "color": "white"
// //        }
//         user.vehicles = [
//             {
//                 make: req.body.vehicleMake,
//                 model: req.body.vehicleModel,
//                 color: req.body.vehicleColor
//             }
//         ];

//         user.save().then(
//             () => {
//                 // Yayyy, updated!
//                 return res.status(200).json({
//                     success: true,
//                     message: 'User updated.'
//                 });
//             },
//             (err) => {
//                 // Boooo, failed!
//                 return res.status(500).json({
//                     success: false,
//                     message: 'User could not be updated.'
//                 });
//             }
//         );
//     });
// }

// getUser = (req, res, next) => {
//     // Look to see if they're in the DB already
//     User.findOne({ email: req.query.email }, (err, user) => {
//     console.log(user);
//         // If we failed the lookup, just get out of there
//         if(err) {
//             return res.status(400).json({
//                 success: false,
//                 error: 'Failed on user lookup',
//             });
//         }

//         // If the user is already created, just move on
//         if(!user) {
//             return res.status(404).json({
//                 success: false,
//                 error: 'User does not exist in the system',
//             });
//         }

//         return res.status(200).json({
//             success:true,
//             user: user
//         })
//     });
// }

module.exports = {
    createIllustration,
    // updateUser,
    // getUser
};