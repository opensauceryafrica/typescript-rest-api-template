import AdminModel from '../model/admin';
import { IAdmin } from '../types/admin/admin';
import { makeRepo } from './root';

export const adminRepository = makeRepo<IAdmin>(AdminModel);
