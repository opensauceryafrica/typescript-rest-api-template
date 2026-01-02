import multer from 'multer';
import _r2 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import env from '../config/env';

export const r2 = (acl = 'public-read') => {
    const s3 = new S3Client({
        region: 'auto',
        endpoint: env.services.cloudflare.r2Endpoint,
        credentials: {
            accessKeyId: env.services.cloudflare.r2AccessKeyId,
            secretAccessKey: env.services.cloudflare.r2SecretAccessKey,
        },
    });
    return multer({
        storage: _r2({
            s3: s3,
            bucket: env.services.cloudflare.r2BucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldname: file.fieldname, originalname: file.originalname, mimetype: file.mimetype });
            },
            key: function (req, file, cb) {
                cb(
                    null,
                    (
                        env.name +
                        Date.now().toString() +
                        file.originalname.split('.')[0] +
                        '.' +
                        file.originalname.split('.')[file.originalname.split('.').length - 1]
                    ).toLowerCase(),
                );
            },
            acl,
            contentType(req, file, cb) {
                cb(null, file.mimetype);
            },
        }),
        limits: { fieldSize: 10 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!['jpeg', 'png', 'jpg', 'gif', 'csv'].includes(file.mimetype.split('/')[1])) {
                return cb(null, false);
            }
            return cb(null, true);
        },
    });
};
