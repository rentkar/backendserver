const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const dataSchema = new Schema( {
	statement: {
		type: String,
		required : true
	}
}, {
	timestamps: true
} )


var data = mongoose.model( 'data', dataSchema )

module.exports = data