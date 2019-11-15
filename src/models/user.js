const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = {
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

    }

}
const User = mongoose.model('Users', userSchema )

module.exports = User
