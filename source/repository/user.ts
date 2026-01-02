import UserModel from '../model/user';
import { IUser } from '../types/user/user';
import { makeRepo } from './root';

export const userRepository = makeRepo<IUser>(UserModel);
