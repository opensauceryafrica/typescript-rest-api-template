import { NextFunction, Request, Response } from 'express';
import * as response from '../../helpers/response';

export const create = (handler: Function): ((req: Request, res: Response, next: NextFunction) => {}) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const respond = await handler(
            { files: req.files, file: req.file, ...req.body, ...req.query, ...req.params },
            req.user?._id,
        );
        if (respond.status) {
            return response._sendSuccessResponse(res, respond.message, respond.data, respond.code ?? 200);
        }
        return response._sendErrorResponse(res, respond.message, {}, respond.code ?? 400);
    };
};
