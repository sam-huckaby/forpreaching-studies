const Illustration = require('../database/models/illustration.model');

// Create a new illustration in the DB
createIllustration = async (req, res) => {
    // Create the illustration document (The model instance that will be saved to the DB)
    const newIllustration = new Illustration({...req.body, creator: req.user.sub});

    // Check if the document was actually instantiated
    if (!newIllustration) {
        // Something was missing from the request object, so it could not be persisted
        return res.status(400).json({ success: false, message: 'Illustration could not be created.' });
    }

    // Attempt to save the illustration document to the database
    try {
        let result = await newIllustration.save();

        return res.status(200).json({
            success: true,
            id: newIllustration._id,
            message: 'Illustration created!',
        });
    } catch (error) {
        console.log("Illustration persistence failed. Details:");
        console.log(error);

        // we failed to save the illustration, ESCAPE
        return res.status(500).json({
            error,
            message: 'Illustration not created!',
        });
    }
}

deleteIllustration = async (req, res) => {
    Illustration.remove({ _id: req.params.id, creator: req.user.sub }, (err, results) => {
        // If we failed the lookup, just get out of there
        if(err) {
            console.log('Illustration deletion error:');
            console.log(err);

            return res.status(400).json({
                success: false,
                error: 'Failed to delete illustration',
            });
        }

        if (results.deletedCount < 1) {
            return res.status(404).json({
                success: false,
                error: 'No illustration found to delete with that ID'
            });
        }

        return res.status(200).json({success: true});
    });
}

getIllustrations = async (req, res) => {
    console.log(req.query.search);
    await Illustration.find().exec((err, illustrations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!illustrations.length) {
            return res
                .status(404)
                .json({ success: false, error: `Illustrations not found` });
        }
        return res.status(200).json({ success: true, data: illustrations })
    }).catch(err => console.log(err));
}

getIllustrationById = async (req, res) => {
    Illustration.findOne({ _id: req.query.id }, (err, illustration) => {
            // If we failed the lookup, just get out of there
            if(err) {
                return res.status(400).json({
                    success: false,
                    error: 'Failed to find illustration',
                });
            }
    
            // If the user is already created, just move on
            if(!illustration) {
                return res.status(404).json({
                    success: false,
                    error: 'No illustration found with id ' + req.query.id,
                });
            }
    
            return res.status(200).json(illustration)
        });
}

getTopTenIllustrations = async (req, res) => {
    await Illustration.find().limit(10).exec((err, illustrations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!illustrations.length) {
            return res
                .status(404)
                .json({ success: false, error: `Illustrations not found` });
        }

        // Truncate the illustration body for each of the top ten, so that they can't cheat to read them anyways
        for(let i = 0; i < illustrations.length; i++) {
            let ellipsis = (illustrations[i].body.length > 500);
            illustrations[i].body = illustrations[i].body.substring(0, 500);
            if (ellipsis) {
                illustrations[i].body += '...';
            }
        }

        return res.status(200).json(illustrations)
    });
}

module.exports = {
    createIllustration,
    deleteIllustration,
    getIllustrations,
    getIllustrationById,
    getTopTenIllustrations,
};