var mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var subOrdersSchema = new Schema( {
	id: {
		type: String,
	},
	amount: {
		type: Currency,
	},
	paymentDue: {
		type: Date,
	},
	paymentStatus: {
		type: String,
		enum: [ "PENDING", "RECEIVED" ],
		default: "PENDING"
	}
} )

var orderreqSchema = new Schema( {
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	productId: {
		type: Schema.Types.ObjectId,
		ref: 'Products',
		required : true
	},
	total_amount: {
		type: Currency,
		required: true,
	},
	allocatedProductId: {
		type: Schema.Types.ObjectId,
		ref: 'SubProducts',
	},
	payment_received: {
		type: Currency,
		required : true 
	},
	payment_pending: {
		type: Currency,
		required : true 
	},
	status: {
		type: String,
		enum : ["ACTIVE", "CONFIRMED"],
		default : "ACTIVE"
	},
	del_address:{
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
	appliedForPOD: {
			type: Boolean,
			default: false
    },
	exp_del: {
		type: Date,
		required: true
	},
	exp_pickup: {
		type: Date,
		required : true
	},
	subOrders : [subOrdersSchema]

}, {
	timestamps: true
} )

var orderreq = mongoose.model( 'orderreq', orderreqSchema )

module.exports = orderreq