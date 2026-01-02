import { Schema, model } from 'mongoose';
import { TFactory } from '../types/misc/factory';
import { ModelName } from '../types/misc/model';

const schema = new Schema<TFactory>(
    {
        users: {
            type: Number,
        },
    },
    { timestamps: true },
);

export default model<TFactory>(ModelName.Factory, schema);
