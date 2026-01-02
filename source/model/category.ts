import mongoose from 'mongoose';
import { IRate } from '../types/admin/rate';
import { ModelName } from '../types/misc/model';
import { ICategory } from '../types/admin/category';

const schema = new mongoose.Schema<ICategory>(
    {
        icon: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        popularity: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        timestamps: true,
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
            },
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
            },
        },
    },
);

schema.index({ name: 1 });
schema.index({ active: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

export default mongoose.model<ICategory>(ModelName.Category, schema);
