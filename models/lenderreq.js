const mongoose = require( 'mongoose' ) 
const Schema = mongoose.Schema

require( 'mongoose-currency' ).loadType( mongoose )
const Currency = mongoose.Types.Currency



var lenderreqSchema = new Schema( {
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'Users'
	},
	status: {
		type: String,
		default: "REQUEST PENDING",
		enum : ["REQUEST ACCEPTED", "REQUEST PENDING", "REQUEST REJECTED"]
	},
	name: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type : String
	},
	product: {
		type: String,
	},
	yearofpurchase: {
		type: String
	},
	additionaldetail: {
		type : String
	}
}, {
	timestamps: true
} )


var lenderreq = mongoose.model( 'lenderreq', lenderreqSchema )

module.exports = lenderreq