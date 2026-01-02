import mongoose from 'mongoose';
import { ModelName } from '../types/misc/model';
import { IPlatform } from '../types/user/user';

const schema = new mongoose.Schema<IPlatform>(
    {
        iosVersion: {
            type: String,
            required: false,
        },
        androidVersion: {
            type: String,
            required: false,
        },
        forceVersion: {
            type: Boolean,
            required: false,
        },
        youtube: {
            type: String,
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

export default mongoose.model<IPlatform>(ModelName.Platform, schema);
