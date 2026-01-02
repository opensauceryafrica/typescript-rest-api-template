import platformModel from '../model/platform';
import { IPlatform } from '../types/user/user';
import { makeRepo } from './root';

export const platformRepository = makeRepo<IPlatform>(platformModel);
