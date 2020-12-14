const Business = require('../database/models/business.model')

createBusiness = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a business',
        });
    }

    const business = new Business(body);

    if (!business) {
        return res.status(400).json({ success: false, error: err });
    }

    business
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: business._id,
                message: 'Business created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Business not created!',
            });
        });
}

updateBusiness = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Business.findOne({ _id: req.params.id }, (err, business) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Business not found!',
            });
        }

        business.name = body.name;
        business.address = body.address;
        business.telephone = body.telephone;
        business.category = body.category;
        business.hours = body.hours;

        business
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: business._id,
                    message: 'Business updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Business not updated!',
                });
            });
    });
}

deleteBusiness = async (req, res) => {
    await Business.findOneAndDelete({ _id: req.params.id }, (err, business) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!business) {
            return res
                .status(404)
                .json({ success: false, error: `Business not found` });
        }

        return res.status(200).json({ success: true, data: business });
    }).catch(err => console.log(err));
}

getBusinessById = async (req, res) => {
    await Business.findOne({ _id: req.params.id }, (err, business) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!business) {
            return res
                .status(404)
                .json({ success: false, error: `Business not found` });
        }
        return res.status(200).json({ success: true, data: business });
    }).catch(err => console.log(err));
}

getBusinesses = async (req, res) => {
    console.log(req.query.search);
    await Business.find({name: new RegExp('.*'+req.query.search+'.*', 'i')}, (err, businesses) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!businesses.length) {
            return res
                .status(404)
                .json({ success: false, error: `Business not found` });
        }
        return res.status(200).json({ success: true, data: businesses })
    }).catch(err => console.log(err));
}

module.exports = {
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinesses,
    getBusinessById,
};