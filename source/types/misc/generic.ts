import { IUser } from '../user/user';

export interface MakeResponse<T = Record<string, unknown>> {
    status: number | boolean;
    message: string;
    data: T;
    code?: number;
}

export interface IContext {
    user?: IUser;
    ip: string;
    referer: string;
    domain: string;
}
