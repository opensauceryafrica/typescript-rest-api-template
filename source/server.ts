import env from './config/env';
import { logan, logger } from './log/logger';
import express, { Application } from 'express';
import * as mongodb from './database/mongodb';
import * as redis from './database/redis';
import handleRouting from './routing';
import * as indexes from './database/indexes';
import cors from 'cors';
import './process';

export default async function startApplication(app: Application): Promise<void> {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.raw());
    app.use(cors());

    app.use(logan);

    await mongodb.openConnection();
    await redis.createConnection();

    indexes.createIndexes();

    app.listen(env.port, async () => {
        logger.debug(`All connections established.`);
        logger.debug(`REST at: http://localhost:${env.port}`);
    });

    handleRouting(app);
}
