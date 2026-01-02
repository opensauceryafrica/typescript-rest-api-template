import mongoose, { Model } from 'mongoose';
import { Page, Pager } from '../types/misc/pagination';
import * as func from '../helpers/func';

export function makeRepo<T>(model: Model<T>) {
    return {
        /**
         * Create a new document
         * @param data
         * @param session
         * @returns {Promise<mongoose.HydratedDocument<T>>}
         */
        create: async (
            data: Partial<Record<keyof T, any>>,
            session?: mongoose.ClientSession,
        ): Promise<mongoose.HydratedDocument<T>> => {
            return (await model.create([data], { session }))[0];
        },

        /**
         * Find a document by id
         * @param id
         * @returns {Promise<mongoose.HydratedDocument<T> | null>}
         */
        findById: async (id: mongoose.ObjectId | string): Promise<mongoose.HydratedDocument<T> | null> => {
            return await model.findOne({ _id: id });
        },

        /**
         * Find a document by id and update it
         * @param id
         * @param data
         * @param session
         * @returns {Promise<mongoose.ModifyResult<mongoose.HydratedDocument<T>> | null>}
         */
        findByIdAndUpdate: async (
            id: mongoose.ObjectId | string,
            data:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            session?: mongoose.ClientSession,
        ): Promise<mongoose.HydratedDocument<T> | null> => {
            return await model.findOneAndUpdate({ _id: id }, data, {
                new: true,
                session,
            });
        },

        /**
         * Find a document by id and delete it
         * @param id
         * @param session
         * @returns {Promise<mongoose.HydratedDocument<T> | null>}
         */
        findByIdAndDelete: async (
            id: mongoose.ObjectId | string,
            session?: mongoose.ClientSession,
        ): Promise<mongoose.HydratedDocument<T> | null> => {
            return await model.findOneAndDelete({ _id: id }, { session });
        },

        /**
         * Find a document by match
         * @param data
         * @returns {Promise<mongoose.HydratedDocument<T> | null>}
         */
        findOneByMatch: async (
            data:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
        ): Promise<mongoose.HydratedDocument<T> | null> => {
            return await model.findOne(data);
        },

        /**
         * Find a document by match and update it
         * @param data
         * @param update
         * @returns {Promise<mongoose.HydratedDocument<T> | null>}
         */
        findOneByMatchAndUpdate: async (
            data:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            update:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            session?: mongoose.ClientSession,
        ): Promise<mongoose.HydratedDocument<T> | null> => {
            return await model.findOneAndUpdate(data, update, { session, new: true });
        },

        /**
         * Find all documents by match
         * @param data
         * @param page
         * @returns {Promise<mongoose.HydratedDocument<T>[] | null>}
         */
        findAllByMatch: async (
            data:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            page: Page,
        ): Promise<mongoose.HydratedDocument<T>[] | null> => {
            return await model
                .find(data)
                .sort({ updatedAt: func.sortDirection(page.sort!) || Pager.Sort })
                .skip(page.offset || Pager.Offset)
                .limit(page.limit || Pager.Limit);
        },

        /**
         * Find a document by match and delete it
         * @param data
         * @param session
         * @returns {Promise<mongoose.HydratedDocument<T> | null>}
         */
        findOneByMatchAndDelete: async (
            data:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            session?: mongoose.ClientSession,
        ): Promise<mongoose.HydratedDocument<T> | null> => {
            return await model.findOneAndDelete(data, { session });
        },

        /**
         * Find all documents by match and delete them
         * @param data
         * @param session
         * @returns {Promise<mongoose.mongo.DeleteResult>}
         */
        findAllByMatchAndDelete: async (
            data:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            session?: mongoose.ClientSession,
        ): Promise<mongoose.mongo.DeleteResult> => {
            return await model.deleteMany(data, { session });
        },

        /**
         * Find all documents by match and update them
         * @param data
         * @param update
         * @param session
         * @returns {Promise<mongoose.mongo.UpdateResult>}
         */
        findAllByMatchAndUpdate: async (
            data:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            update:
                | Partial<Record<keyof T, any>>
                | mongoose.RootQuerySelector<Partial<Record<keyof T, any>>>
                | mongoose.UpdateQuery<Partial<Record<keyof T, any>>>,
            session?: mongoose.ClientSession,
        ): Promise<mongoose.mongo.UpdateResult> => {
            return await model.updateMany(data, update, { session });
        },

        /**
         * Perform aggregation pipeline
         * @param pipeline MongoDB aggregation pipeline stages
         * @returns {Promise<Partial<I>[]>} Aggregation results based on the model type
         */
        aggregate: async <I>(pipeline: mongoose.PipelineStage[]): Promise<Partial<I>[]> => {
            return await model.aggregate(pipeline);
        },
    };
}
