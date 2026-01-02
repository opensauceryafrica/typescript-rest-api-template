import FactoryModel from '../model/factory';
import { HydratedDocument } from 'mongoose';
import { TFactory } from '../types/misc/factory';
import env from '../config/env';

export const cursor = async (key: string, step = env.cursor.step): Promise<TFactory> => {
    const query: Record<string, unknown> = {};
    query[key] = { $exists: true };
    const found = await FactoryModel.findOne(query);
    if (found) {
        return (await FactoryModel.findByIdAndUpdate(found._id, { $inc: { [key]: step } }, { new: true }))!;
    }
    const data: Record<string, unknown> = {};
    data[key] = step;
    return await new FactoryModel(data).save();
};
