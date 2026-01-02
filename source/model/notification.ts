import mongoose from 'mongoose';
import { ModelName } from '../types/misc/model';
import { INotification } from '../types/user/notification';
import { TxType } from '../types/misc/enum';

const schema = new mongoose.Schema<INotification>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelName.User,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        new: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            enum: TxType,
            required: true,
        },
        entity: {
            type: mongoose.Schema.Types.Mixed,
            required: false,
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
schema.index({ new: 1 });
schema.index({ updatedAt: 1 });
schema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 5 });

export default mongoose.model<INotification>(ModelName.Notification, schema);
