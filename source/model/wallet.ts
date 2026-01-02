import mongoose from 'mongoose';
import { IWallet } from '../types/user/wallet';
import { ModelName } from '../types/misc/model';
import { Currency } from '../types/misc/enum';

const schema = new mongoose.Schema<IWallet>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelName.User,
            required: true,
        },
        mainBalance: {
            type: Number,
            default: 0,
            required: true,
        },
        referralBalance: {
            type: Number,
            default: 0,
            required: true,
        },
        lifetimeReferralBalance: {
            type: Number,
            default: 0,
            required: true,
        },
        currency: {
            type: String,
            enum: Currency,
            default: Currency.NGN,
        },
        locked: {
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
schema.index({ currency: 1 });
schema.index({ locked: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });
schema.index({ mainBalance: 1 });
schema.index({ referralBalance: 1 });
schema.index({ lifetimeReferralBalance: 1 });
schema.index({ user: 1, currency: 1 }, { unique: true });

export default mongoose.model<IWallet>(ModelName.Wallet, schema);
