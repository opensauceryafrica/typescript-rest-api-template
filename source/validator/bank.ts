import Joi from 'joi';
import { IUser } from '../types/user/user';

export const resolve = Joi.object({
    query: Joi.object<IUser['banks'][0]>({
        accountNumber: Joi.string().required(),
        bankCode: Joi.string().required(),
    }).required(),
});
