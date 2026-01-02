import Joi from 'joi';
import { Endpoint } from '../types/user/enum';
import { IEmailConfirmation, IEmailVerification } from '../types/user/verification';

export const emailVerification = Joi.object({
    body: Joi.object<IEmailVerification>({
        email: Joi.string().email().required(),
        referral: Joi.string().optional().allow(null, ''),
        endpoint: Joi.string()
            .valid(...Object.values(Endpoint))
            .required(),
    }).required(),
});

export const emailConfirmation = Joi.object({
    body: Joi.object<IEmailConfirmation>({
        code: Joi.string().required(),
        email: Joi.string().email().required(),
        endpoint: Joi.string()
            .valid(...Object.values(Endpoint))
            .required(),
    }).required(),
});
