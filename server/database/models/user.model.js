const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        referral_code: {
            type: String,
            default: function() {
                let hash = 0;
                for (let i = 0; i < this.email.length; i++) {
                    hash = this.email.charCodeAt(i) + ((hash << 5) - hash);
                }
                let res = (hash & 0x00ffffff).toString(16).toUpperCase();
                return "00000".substring(0, 6 - res.length) + res;
            }
        },
        referred_by: {
            type: String,
            default: null
        },
        registerDate: {
            type: Date,
            default: Date.now
        },
        phoneNumber: String,
        birthday: {
            year: Number,
            month: Number,
            day: Number
        },
        vehicleType: {
            type: String,
            default: null
        },
        vehicleColor: {
            type: String,
            default: null
        },
        vehicleLicense: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true,
        strict: false
    },
)

// ====================== model methods ======================

// generate a password hash
User.methods.setPassword = function(password) {
    // Set the password to the salted password hash
    this.local.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// checking if password is valid
User.methods.validatePassword = async function(password) {
    // Simple hash check of the stored password
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User)