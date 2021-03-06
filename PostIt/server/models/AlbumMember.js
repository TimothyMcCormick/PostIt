import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



export const AlbumMemberSchema = new Schema({
  accountId: {type: ObjectId, required: true, ref: 'Account'},
  albumId: {type: ObjectId, required: true, ref: 'Album'},
}, 
{ timestamps: true, toJSON: { virtuals: true } }
)


AlbumMemberSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

AlbumMemberSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album'
})

