const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const supportSchema = new Schema( {
	supporttype: {
		type: String,
		required: true,
		enum: [
			"QUERY", "TECHNICAL HELP", "PAYMENT RELATED",
			"ORDER RELATED", "REFUND RELATED",
			"FEEDBACK", "LISTED PRODUCT RELATED"
		]
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	orderId: {
		type: Schema.Types.ObjectId,
		ref: 'orders'
	},
	resolved: {
		type: Boolean,
		required: true,
		default: false
	},
	statement: {
		type: String,
		required : true
	},
	solution: {
		type: String
	}
}, {
	timestamps: true
} )


var Support = mongoose.model( 'Support', supportSchema )

module.exports = Support