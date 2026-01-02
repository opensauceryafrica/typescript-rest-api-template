import mongoose from 'mongoose';
import { IRate } from '../types/admin/rate';
import { ModelName } from '../types/misc/model';
import { RateFor, RateType } from '../types/misc/enum';

const schema = new mongoose.Schema<IRate>(
    {
        type: {
            type: String,
            enum: Object.values(RateType),
            required: false,
        },
        icon: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        symbol: {
            type: String,
            required: false,
        },
        baseCurrency: {
            type: String,
            required: false,
        },
        exchangeCurrency: {
            type: String,
            required: false,
        },
        moq: {
            type: Number,
            required: false,
        },
        rate: {
            type: Number,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        active: {
            type: Boolean,
            default: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelName.Category,
            required: false,
        },
        for: {
            type: String,
            enum: Object.values(RateFor),
            required: false,
        },
        ecodeRate: {
            type: Number,
            required: false,
        },
        margin: {
            type: Number,
            required: false,
        },
        emargin: {
            type: Number,
            required: false,
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

schema.index({ type: 1 });
schema.index({ name: 1 });
schema.index({ symbol: 1 });
schema.index({ baseCurrency: 1 });
schema.index({ active: 1 });
schema.index({ category: 1 });
schema.index({ for: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

export default mongoose.model<IRate>(ModelName.Rate, schema);
