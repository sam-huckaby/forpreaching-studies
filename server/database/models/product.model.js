const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        business_id: String,
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        color: String,
        edible: Boolean,
        size: Number
    },
    { timestamps: true },
)

module.exports = mongoose.model('product', Product)