import mongoose from 'mongoose';
import * as func from '../helpers/func';
import { IAdmin } from '../types/admin/admin';
import { ModelName } from '../types/misc/model';

const schema = new mongoose.Schema<IAdmin>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        days: {
            type: [Number],
            required: true,
        },
        tabs: {
            type: [String],
            required: true,
        },
        super: {
            type: Boolean,
            default: false,
            required: true,
        },
        deleted: {
            type: Boolean,
            default: false,
            required: true,
        },
        signupalert: {
            type: Boolean,
            default: true,
            required: true,
        },
        fcmToken: {
            type: String,
        },
    },
    {
        timestamps: true,
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    },
);

schema.index({ email: 1 });
schema.index({ super: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

export default mongoose.model<IAdmin>(ModelName.Admin, schema);
