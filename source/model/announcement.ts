import mongoose from 'mongoose';
import { ModelName } from '../types/misc/model';
import { IAnnoucement } from '../types/admin/annoucement';

const schema = new mongoose.Schema<IAnnoucement>(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        attachments: {
            type: [String],
            required: false,
        },
        channels: {
            type: [String],
            required: true,
        },
        date: {
            type: Date,
            required: false,
        },
        sent: {
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

schema.index({ title: 1 });
schema.index({ message: 1 });
schema.index({ channels: 1 });
schema.index({ sent: 1 });
schema.index({ date: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });
// schema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 5 });

export default mongoose.model<IAnnoucement>(ModelName.Announcement, schema);
