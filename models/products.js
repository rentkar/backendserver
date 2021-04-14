const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

var pricingSchema = new Schema(
  {
    duration: {
      type: String,
    },
    price: {
      type: Currency,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

var specSchema = new Schema(
  {
    stype: {
      type: String,
    },
    spec: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var boxSchema = new Schema(
  {
    content: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var imageSchema = new Schema({
  image: {
    type: String,
  },
});

const productSchema = new Schema(
  {
    id: {
      type: String,

      unique: true,
    },

    sub_id: [{ type: Schema.Types.ObjectId, ref: "SubProducts" }],

    name: {
      type: String,

      unique: true,
    },
    price: {
      type: Currency,
    },
    images: [imageSchema],
    image: {
      type: String,
    },
    carousel: [imageSchema],
    category: {
      type: String,

      enum: ["MUSIC", "GAMING", "LAPTOP", "PHOTOGRAPHY"],
    },
    subcategory: {
      type: String,

      enum: [
        "GUITAR",
        "KEYBOARD",
        "PERCUSSION",
        "RECORDING",
        "RECORDING",
        "AMPLIFIER",
        "GROOVE",
        "WIND",
        "PACKAGES",
        "PC GAMING",
        "CONSOLE",
        "ACCESSORIES",
        "GAMING",
        "i3",
        "i5",
        "i7",
        "MACBOOK",
        "PC",
        "TABLETS",
        "CAMERA",
        "FILTERS",
        "LENS",
        "LIGHTS",
        "RECORDING",
        "RIGS",
      ], //CHANGE IT LATER TO HAVE NESTED CATEGORIES
    },
    quantity: {
      type: Number,
    },
    pricing: [pricingSchema],
    adOns: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    featured: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
    specifications: [specSchema],
    limitedStock: {
      type: Boolean,
      default: false,
    },
    availableInMumbai: {
      type: Boolean,

      default: false,
    },
    availableInPune: {
      type: Boolean,

      default: false,
    },
    box: [boxSchema],
  },
  {
    timestamps: true,
  }
);

var Products = mongoose.model("Products", productSchema);

module.exports = Products;
