var mongoose = require('mongoose')
var Schema = mongoose.Schema



var addressSchema = new Schema( {
    type: {
        type: String,
        enum: ["HOME", "WORK", "OTHERS"]
    },
    address: {
        houseNumber: {
            type: String,
        },
        street: {
            type: String,
        },
        locality: {
            type: String
        },
        city: {
            type: String,
        },
        state : {
            type : String,
        }, 
        zip: {
            type: Number,

        }
    },
})
var Users = new Schema( {
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    addresses: [ addressSchema ],
    dob: {
        type: Date,
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
        enum: [ "MALE", "FEMALE", "NOT SPECIFIED" ],
        default: 'NOT SPECIFIED',
    },
    image: {
        type: String,
    },
    document: {
        doctype: {
            type: String,
            enum: [ "AADHAR", "DRIVING LICENSE", "PASSPORT" ],
        },
        doccopy: {
            type: String,
        }
    },
    verified: {
        type: Boolean,
        default: false,
    },
    lender: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


module.exports = mongoose.model( 'Users', Users )