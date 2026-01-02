import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import env from '../config/env';
import { logger } from '../log/logger';

export const push = async (payload: {
    title: string;
    body: string;
    type: string;
    metadata: string;
    tokens: string[];
    link?: string
}): Promise<void> => {
    try {
        const app = getApps().length
            ? getApps()[0]
            : initializeApp({
                  credential: cert(JSON.parse(env.services.firebase.credential)),
              });
        const messaging = getMessaging(app);

        // 500 tokens per request
        for (let i = 0; i < payload.tokens.length; i += 500) {
            if (payload.tokens.length) {
                const response = await messaging.sendEachForMulticast({
                    data: {
                        title: payload.title,
                        body: payload.body.substring(0, 200),
                        type: payload.type,
                        icon:  env.logo ?? "https://swiftswapexchange.com/logo.png",
                        link: payload.link || "https://swiftswapexchange.com",
                        metadata: payload.metadata,
                    },
                    tokens: payload.tokens.slice(i, i + 500),
                    android: {
                        priority: 'high',
                        data: {
                            type: payload.type,
                            metadata: payload.metadata,
                        },
                        notification: {
                            title: payload.title,
                            body: payload.body.substring(0, 200),
                        },
                    },
                    apns: {
                        payload: {
                            aps: {
                                alert: {
                                    title: payload.title,
                                    body: payload.body.substring(0, 200),
                                },
                                type: payload.type,
                                metadata: payload.metadata,
                                contentAvailable: true,
                            },
                            headers: {
                                'apns-push-type': 'background',
                                'apns-priority': '5',
                            },
                        },
                    },
                    webpush: {
                        headers:{
                            Urgency: "high",
                        },
                    }
                });
                logger.info(`[fcm] - [${JSON.stringify(response)}]`);
            }
        }
    } catch (error) {
        logger.error(`[fcm] - [${JSON.stringify(payload)}] - [${error}]`);
    }
};
