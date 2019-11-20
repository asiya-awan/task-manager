const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Anonymous',
        trim: true
    },
    position: {
        type: String,
        required: [ true, 'How come not working?']
    },
    age: {
        type: Number,
        default:0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    phone: {
        type: String,
        validate(value) {
            return /\d{3}-\d{3}-\d{4}/.test(value);
        }
            // message: props => `${props.value} is not a valid phone number!`
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        validate(value) {
           if(!validator.isEmail(value)){
               throw new Error ('Email is invalid: ', value)
           }

        }  
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [ 7, 'Password legnth should be greater than 6'],
        validate(value) {
            const isPassword = value.toLowerCase().includes('password');
            if(isPassword) {

                throw new Error('Password should not contain a Password')
            }
        }

    },

    tokens: [{
        token:{
            type:String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
    
}, {
    timestamps: true  
})


userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',    //user_Id
    foreignField: 'owner'
})

userSchema.methods.toJSON =  function () {
    const user = this
    console.log("User: ",user)
    const userObject =  user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    console.log("userObject: ", userObject)

    return userObject
}

// methods are accessible on the instance
userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}



//statics are accessible on the models
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Inavlid credentials! Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Inavlid credentials! Unalbe to login')
    }

    return user
}

//Hash the plain text before saving
userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete the user tasks when user is removed

userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('Users', userSchema )

module.exports = User
