const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator') 
const Product =require('./products')

// Schema object
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password must not contain "password" word')
            }
        }
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
}, {
    timestamps: true
})

userSchema.methods.toJSON = function (){
    const user=this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}
//Auth User
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secretkey')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

//Hash the password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
//Delete User products when user is deleted
userSchema.pre('remove',async function(next){
    const user=this
    await Product.deleteMany({
        owner:user._id
    })
        next()
     })
    const User = mongoose.model('User', userSchema)
module.exports = User
