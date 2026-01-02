import { RequestHandler, Router } from 'express';
import validator from '../../validator/validator';
import * as controller from '../../controllers/rest/base';
import * as cloudflare from '../../service/cloudflare';
import { authenticate } from '../../middleware/authenticate';
import * as verificationvalidator from '../../validator/verification';
import * as banklogic from '../../logics/bank';
import * as platformlogic from '../../logics/platform';
import * as bankvalidator from '../../validator/bank';

const router = Router();

router.get('/banks', authenticate(null, ['authorization']), controller.create(banklogic.banks));

router.get('/platform', controller.create(platformlogic.platform));

export default (app: Router) => app.use('/', router);
