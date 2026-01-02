import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from '../helpers/jwt';
import mongoose from 'mongoose';
import * as response from '../helpers/response';
import { IContext, MakeResponse } from '../types/misc/generic';
import { GraphError } from '../types/misc/graphql';
import { userRepository } from '../repository/user';
import * as bcrypt from '../helpers/bcrypt';

export default async (req: Request): Promise<IContext | GraphError> => {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;

    const referer = (req.headers['x-typescript-graphql-api-template-dev'] as string) || req.headers.referer || '';

    const domain = req.protocol + '://' + req.get('host');

    if (
        !req ||
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer ') ||
        !req.headers.authorization.split(' ')[1] ||
        !req.headers.authorization.split(' ')[1].length
    ) {
        return { ip, referer, domain };
    }

    const token = req.headers.authorization!.split(' ')[1];
    if (token) {
        const verified = await jwt.verifyToken(token);
        if (verified.status) {
            const account = await userRepository.findById(verified.data['id'] as mongoose.ObjectId);
            if (!account) {
                return response.sendErrorResponse('Please login again!', 401);
            }
            return { user: account.toJSON(), ip, referer, domain };
        }
        return response.sendErrorResponse(verified.message, verified.code);
    }
    return { ip, referer, domain };
};

// export const validateAccess = (
//     user: IUser,
//     roles: Role[],
//     permissions: string[],
//     requirements: { key: string; value: any; error: string }[],
//     or = false,
// ): MakeResponse => {
//     if (!user) {
//         return {
//             status: false,
//             message: 'Please login again!',
//             data: {},
//             code: 401,
//         };
//     }

//     // verify that user has the required role
//     // role uses OR operation
//     // if (roles.length) {
//     //     if (!roles.map((r) => r.toLowerCase()).includes(user.role.toLowerCase())) {
//     //         return {
//     //             status: false,
//     //             message: "You don't have the required role!",
//     //             data: {},
//     //             code: 403,
//     //         };
//     //     }
//     // }

//     // verify that user has the required permission
//     // permission uses either OR / AND operation
//     // if (permissions.length) {
//     //     let permit = user.permissions || {};
//     //     perm: for (const permission of permissions) {
//     //         permit = user.permissions || {};
//     //         const permissionKeys = permission.toLowerCase().split('.');
//     //         pkey: for (const pkey of permissionKeys) {
//     //             if (permit && Object.keys(permit).includes(pkey)) {
//     //                 permit = permit[pkey];
//     //             } else {
//     //                 permit = false;
//     //                 continue pkey;
//     //             }
//     //         }

//     //         if (or && permit === true) {
//     //             break perm;
//     //         } else if (!or && permit === false) {
//     //             break perm;
//     //         }
//     //     }

//     //     if ((or && permit === false) || (!or && permit !== true)) {
//     //         return {
//     //             status: false,
//     //             message: "You don't have sufficient permissions to perform this action!",
//     //             data: {},
//     //             code: 403,
//     //         };
//     //     }
//     // }

//     // verify that user meets the required requirements
//     // requirements uses AND operation
//     if (requirements.length) {
//         for (const requirement of requirements) {
//             // re-assigning user with type any for this to work
//             const u: any = user;
//             if (u[requirement.key] != requirement.value) {
//                 return {
//                     status: false,
//                     message: requirement.error,
//                     data: {},
//                     code: 403,
//                 };
//             }
//         }
//     }

//     return {
//         status: true,
//         message: 'Access granted!',
//         data: {},
//     };
// };

/**
 * when passing 'pin' as a part of the headers
 * @param headers
 * @param tabs
 * @param roles
 * @returns
 */
export const authenticate = (
    repository: { findById: Function } | null,
    headers = ['authorization'],
    requirements: { key: string; value: unknown; error: string }[] = [],
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        for (const header of headers) {
            const value = req.headers[header];
            if (header === 'authorization') {
                if (!value) {
                    return response._sendErrorResponse(res, 'Please login again!', {}, 401);
                }
                const verified = await jwt.verifyToken((value as string).split(' ')[1]);
                if (!verified.status) {
                    return response._sendErrorResponse(res, verified.message, {}, 401);
                }
                if (repository != null) {
                    const user = await repository.findById(verified.data['id'] as mongoose.ObjectId);
                    if (!user) {
                        return response._sendErrorResponse(res, 'Please login again!', {}, 401);
                    }
                    if (user.deleted) {
                        return response._sendErrorResponse(
                            res,
                            'Account has been deleted! Please contact support.',
                            {},
                            401,
                        );
                    }
                    req.user = { ...user.toJSON(), pin: user.pin };
                }
            }
            if (header === 'pin') {
                if (!value) {
                    return response._sendErrorResponse(res, 'Transaction pin or biometrics data invalid!', {}, 403);
                }
                if (!req.user?.pin) {
                    return response._sendErrorResponse(res, 'Transaction pin not set! Please reset.', {}, 403);
                }
                const valid = bcrypt.compareEncryption(value as string, req.user?.pin);
                if (!valid && !(value === 'biometrics' && req.user?.biometrics)) {
                    return response._sendErrorResponse(res, 'Transaction pin or biometrics data invalid!', {}, 403);
                }
            }
        }
        for (const requirement of requirements) {
            if (req.user && req.user[requirement.key as keyof typeof req.user] !== requirement.value) {
                return response._sendErrorResponse(res, requirement.error, {}, 403);
            }
        }
        return next();
    };
};
