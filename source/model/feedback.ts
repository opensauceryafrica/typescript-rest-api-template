import mongoose from 'mongoose';
import { IFeedback } from '../types/user/feedback';
import { ModelName } from '../types/misc/model';

const schema = new mongoose.Schema<IFeedback>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        files: [
            {
                type: String,
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelName.User,
            required: true,
        },
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

schema.index({ user: 1 });
schema.index({ deleted: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

export default mongoose.model<IFeedback>(ModelName.Feedback, schema);
