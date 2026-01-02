import mongoose from 'mongoose';
import { IReward } from '../types/user/reward';
import { ModelName } from '../types/misc/model';
import { RewardStatus } from '../types/misc/enum';

const schema = new mongoose.Schema<IReward>(
    {
        referral: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelName.User,
            required: true,
        },
        referee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelName.User,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(RewardStatus),
            required: true,
            default: RewardStatus.ISSUED,
        },
        reason: {
            type: String,
        },
        asset: {
            type: mongoose.Schema.Types.Mixed,
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

schema.index({ referral: 1 });
schema.index({ referee: 1 });
schema.index({ status: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

export default mongoose.model<IReward>(ModelName.Reward, schema);
