import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId



export const JobSchema = new Schema({
  company: { type: String, required: true, minlength: 1, maxlength: 50 },
  jobTitle: { type: String, required: true, minlength: 1, maxlength: 50 },
  hours: { type: Number, required: true, minlength: 4, maxlength: 10 },
  rate: { type: Number, minlength: 3, maxlength: 30 },
  description: { type: String, minlength: 20, maxlength: 500 },

  employerId: { type: ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

JobSchema.virtual('employer', {
  localField: 'employerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})




