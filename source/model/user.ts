import mongoose from 'mongoose';
import * as func from '../helpers/func';
import { IUser } from '../types/user/user';
import { ModelName } from '../types/misc/model';
import { Country, Medium, Theme } from '../types/misc/enum';

const schema = new mongoose.Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true, // creates a unique index
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            set: func.firstCharToUpperCase,
            required: true,
        },
        lastname: {
            type: String,
            set: func.firstCharToUpperCase,
            required: true,
        },
        phone: {
            type: String,
            // // create a sparse index
            // index: { unique: true, sparse: true },
        },
        country: {
            type: String,
            enum: Country,
            default: Country.NG,
        },
    },

    {
        timestamps: true,
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                ret.banks = ret.banks?.map((b: { _id: mongoose.Types.ObjectId }) => {
                    return { ...b, id: b._id };
                });
                delete ret.password;
                delete ret.pin;
                delete ret.otp;
                delete ret.expiry;
                delete ret.__v;
            },
        },
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                ret.banks = ret.banks?.map((b: { _id: mongoose.Types.ObjectId }) => {
                    return { ...b, id: b._id };
                });
                delete ret.password;
                delete ret.pin;
                delete ret.otp;
                delete ret.expiry;
                delete ret.__v;
            },
        },
    },
);

schema.index({ email: 1 });
schema.index({ username: 1 });
schema.index({ medium: 1 });
schema.index({ referral: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });
schema.index({ 'banks.accountNumber': 1 });

schema.pre('validate', async function (next) {
    if (!this.username) {
        this.username = (await func.generateId(ModelName.User, '0', 6))
            .replace(ModelName.User, this.firstname.charAt(0) + this.lastname.charAt(0))
            .toLowerCase();
    }
    next();
});

schema.pre('save', async function (next) {
    if (!this.username) {
        this.username = (await func.generateId(ModelName.User, '0', 6))
            .replace(ModelName.User, this.firstname.charAt(0) + this.lastname.charAt(0))
            .toLowerCase();
    }
    next();
});

export default mongoose.model<IUser>(ModelName.User, schema);
