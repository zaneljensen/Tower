import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema({
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minlength: 2, },
    description: { type: String, required: true, minlength: 10, },
    coverImg: { type: String, required: false, },
    location: { type: String, required: true, minlength: 3, },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true

})

