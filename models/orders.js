var mongoose = require( 'mongoose' )
var Schema = mongoose.Schema

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


var subOrdersSchema = new Schema( {
	id: {
		type: String,
		required : true
	},
	amount: {
		type: Currency,
		required : true
	},
	paymentDue: {
		type: Date,
		required : true
	},
	paymentStatus: {
		type: String,
		enum : ["PENDING", "RECEIVED"]
	}
})

var ordersSchema = new Schema( {
	reqId: {
		type: Schema.Types.ObjectId,
		ref: 'orderreq',
		required: true
	}, 
	id: {
		type: String,
		unique : true, 
		required : true
	},
	allocatedProductId: {
		type: Schema.Types.ObjectId,
		ref: 'SubProducts',
		required : true
	},
	total_amount: {
		type: Currency,
		required: true,
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
		enum : ["ACTIVE", "CONFIRMED", "DISPATCH", "DELIVERED", "PICKUP"],
		default : "ACTIVE"
	},
	delivery_date: {
		type: Date,
		required: true
	},
	pickup_date: {
		type: Date,
		required : true
	},
	subOrders : [subOrdersSchema]
}, {
	timestamps: true
} )

var orders = mongoose.model( 'orders', ordersSchema )

module.exports = orders