import { MakeResponse } from '../types/misc/generic';
import { logger } from '../log/logger';
import * as response from '../helpers/response';
import { platformRepository } from '../repository/platform';

export async function platform(): Promise<MakeResponse> {
    try {
        const platform = await platformRepository.findOneByMatch({});

        return response.makeResponse(true, 'Platform retrieved.', platform);
    } catch (error: any) {
        logger.error(`[platform] - [${JSON.stringify({})}] - [${error.message}]`);
        return response.makeResponse(false, 'Failed to retrieve platform! Please try again.', {});
    }
}
