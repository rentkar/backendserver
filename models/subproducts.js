const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


var subproductSchema = new Schema( {  
    id: {
        type: String,
        required: true,
        unique: true,
	}, 
	productId: {
    type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Products'
	},
    lenderId: {
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Users'
    },
    availability: {
        type: Boolean,
        required : true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'orders'
		
    },
    dateOfPurchase: {
        type: Date
    }
}, {
    timestamps: true
} )

var SubProducts = mongoose.model('SubProducts', subproductSchema);

module.exports = SubProducts