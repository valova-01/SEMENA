const mongoose = require('mongoose')
const validator = require('validator')

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: 'Image should be a valid url',
      },
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    ripeningPeriod: {
      type: String,
      required: true,
    },
    growingRegion: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
