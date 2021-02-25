var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        ref: 'ProductType'
    },
    productName: {
        type: String,
        minLength: 3,
        required: true,
        trim: true
    },
    expiryDate:{
        type: Date,
        required:true
    },
    price: {
        type: Number,
       default:0,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("Product", productSchema);
