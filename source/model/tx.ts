import mongoose from 'mongoose';
import { ITx } from '../types/user/tx';
import { ModelName } from '../types/misc/model';
import { Currency, TxStatus, TxType } from '../types/misc/enum';

const schema = new mongoose.Schema<ITx>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ModelName.User,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(TxType),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(TxStatus),
            required: true,
            default: TxStatus.PENDING,
        },
        baseCurrency: {
            type: String,
            // enum: Object.values(Currency),
            required: true,
        },
        exchangeCurrency: {
            type: String,
            enum: Object.values(Currency),
            required: true,
        },
        fee: {
            type: Number,
            required: true,
            default: 0,
        },
        rate: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        files: [
            {
                type: String,
                default: [],
            },
        ],
        proofs: [
            {
                type: String,
                default: [],
            },
        ],
        reason: {
            type: String,
        },
        accountNumber: {
            type: String,
        },
        accountName: {
            type: String,
        },
        bankName: {
            type: String,
        },
        ecode: {
            type: Boolean,
            default: false,
        },
        code: {
            type: String,
        },
        pin: {
            type: String,
        },
        comment: {
            type: String,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
        },
        asset: {
            type: mongoose.Schema.Types.Mixed,
        },
        origination: {
            rate: {
                type: Number,
            },
            amount: {
                type: Number,
            },
            ecode: {
                type: Boolean,
            },
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        vendors: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: ModelName.Admin,
            default: [],
        },
        checksum: {
            type: String,
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
schema.index({ type: 1 });
schema.index({ status: 1 });
schema.index({ baseCurrency: 1 });
schema.index({ exchangeCurrency: 1 });
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });
schema.index({ 'metadata.id': 1 });

export default mongoose.model<ITx>(ModelName.Tx, schema);
