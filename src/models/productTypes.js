var mongoose = require('mongoose');

var productTypeSchema = new mongoose.Schema({
    name: {
        type: 'string',
        minLength: 2,
        required: true,
        unique: true
    }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('ProductType', productTypeSchema)
