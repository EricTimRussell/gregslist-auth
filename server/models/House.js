import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HouseSchema = new Schema({
  bedrooms: { type: Number, required: true, maxlength: 50 },
  bathrooms: { type: Number, required: true, minlength: 1, maxlength: 50 },
  levels: { type: Number, required: true, maxlength: 50 },
  imgUrl: { type: String, default: 'https://webstockreview.net/images/clipart-house-pdf-6.png' },
  year: { type: String, required: true, minlength: 4, maxlength: 4 },
  price: { type: String, required: true, maxlength: 8 },
  description: { type: String, minlength: 20, maxlength: 500, default: '' },

  sellerId: { type: ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

HouseSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justone: true,
  ref: 'Account'
})


