import mongoose from 'mongoose';
import { IFAQ } from '../types/admin/faq';
import { ModelName } from '../types/misc/model';

const schema = new mongoose.Schema<IFAQ>(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        files: [
            {
                type: String,
            },
        ],
        deleted: {
            type: Boolean,
            default: false,
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

schema.index({ deleted: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

export default mongoose.model<IFAQ>(ModelName.FAQ, schema);
