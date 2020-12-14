const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Business = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        hours: {
            type: [String],
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        employees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    { timestamps: true },
);

module.exports = mongoose.model('Business', Business);