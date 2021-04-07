const mongoose = require( 'mongoose' ) 
const Schema = mongoose.Schema

require( 'mongoose-currency' ).loadType( mongoose )
const Currency = mongoose.Types.Currency



var lenderreqSchema = new Schema( {
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
	},
	productId: {
		type: Schema.Types.ObjectId,
		required : true,
		ref: 'Products'
	},
	status: {
		type: String,
		default: "REQUEST PENDING",
		enum : ["REQUEST ACCEPTED", "REQUEST PENDING", "REQUEST REJECTED"]
	}
}, {
	timestamps: true
} )


var lenderreq = mongoose.model( 'lenderreq', lenderreqSchema )

module.exports = lenderreq