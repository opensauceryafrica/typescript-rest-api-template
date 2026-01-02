import { config } from 'dotenv';
config();

const os = Object.assign({}, process.env);

export default {
    name: os.APP_NAME || 'typescript-graphql-api-template',
    logo: process.env.APP_LOGO || '',
    domain: {
        user: {
            api: os.APP_DOMAIN_API || 'http://localhost:3000',
            web: {
                dev: os.APP_DOMAIN_WEB_DEV || 'http://localhost:3000',
                stage: os.APP_DOMAIN_WEB_STAGE || 'https://typescript-graphql-api-template-frontend-zeta.vercel.app',
            },
        },
    },
    services: {
        firebase: {
            credential: os.FIREBASE_CREDENTIAL || '',
        },
        termii: {
            api: os.TERMII_API || 'https://api.ng.termii.com/api',
            key: os.TERMII_KEY || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        cloudflare: {
            r2Location: os.R2_LOCATION || '',
            r2DevURL: os.R2_DEV_URL || '',
            r2Endpoint: os.R2_ENDPOINT || '',
            r2AccessKeyId: os.R2_ACCESS_KEY_ID || '',
            r2SecretAccessKey: os.R2_SECRET_ACCESS_KEY || '',
            r2BucketName: os.R2_BUCKET_NAME || '',
        },
        lenco: {
            api: os.LENCO_API || 'https://api.lenco.co/access/v1',
            apiKey: os.LENCO_API_KEY || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            publicKey: os.LENCO_PUBLIC_KEY || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            debitAccountId: os.LENCO_ACCOUNT_UUID || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            products: {
                logo: {
                    MTN: 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747586347448mtn.jpeg',
                    GLO: 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747586347434glo.png',
                    Airtel: 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747586347254airtel.jpg',
                    '9 Mobile': 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho17475863471219mobile.png',
                    NTEL: 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747586347254ntel.png',
                    'Smile Communications':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747589839558smile.png',
                    'Abuja Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594504991aedc.png',
                    'Eko Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594504984eko.jpg',
                    'Enugu Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594504984enugu.jpg',
                    'Ibadan Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594504983ibadan.png',
                    'Port-Harcourt Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594654963portharcourt.jpg',
                    'Ikeja Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594504984ikeja.png',
                    'Jos Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594654963jos.jpeg',
                    'Kaduna Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594654963kaduna.jpg',
                    'Kano Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594654958kano.png',
                    'Benin Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594654957benin.png',
                    'Yola Electricity PrePaid':
                        'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747594731385yola.jpg',
                    DSTV: 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747597965923dstv.png',
                    GoTV: 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747597965923gotv.jpg',
                    Showmax: 'https://pub-f20debf3db1a40abaf01f62ea3a01c58.r2.dev/mdiho1747597965922showmax.png',
                },
            },
        },
        dojah: {
            url: os.DOJAH_BASE_URL || 'https://api.dojah.io',
            privateKey: os.DOJAH_PRIVATE_KEY || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            appId: os.DOJAH_APP_ID || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
    },
    jwt: {
        secret: os.APP_SECRET || 'insecure@1bug.com',
        expiry: os.JWT_EXPIRY || '30d',
    },
    port: Number(os.PORT) || 3000,
    cursor: {
        step: 50, // step for factory ids
        current: 0, // current factory id
        pointer: 0, // index in current
    },
    deploymentEnv: os.DEPLOYMENT_ENV || 'development',
    database: {
        mongodb: {
            host: os.DB_HOST || 'localhost',
            port: Number(os.DB_PORT) || 27017,
            name: os.DB_NAME || 'typescript-graphql-api-template',
            user: os.DB_USER || 'typescript-graphql-api-template',
            password: os.DB_PASSWORD || 'password',
            uri: `mongodb+srv://${os.DB_USER}:${os.DB_PASSWORD}@${os.DB_HOST}/${os.DB_NAME}?retryWrites=true&authSource=admin`,
        },
        redis: {
            port: Number(os.REDIS_PORT) || 6379,
            host: os.REDIS_HOST || 'xxxx',
            username: os.REDIS_USERNAME || 'localhost',
            password: os.REDIS_PASSWORD || 'password',
            url: `redis://${os.REDIS_USER}:${os.REDIS_PASSWORD}@${os.REDIS_HOST}:${Number(os.REDIS_PORT)}`,
        },
    },
    kafka: {
        cluster: os.KAFKA_CLUSTER || 'localhost:9092',
        clientId: os.KAFKA_CLIENT_ID || 'my-app',
        username: os.KAFKA_USERNAME || 'admin',
        password: os.KAFKA_PASSWORD || 'password',
    },
    payment: {
        flutterwave: {
            live: {
                publicKey: process.env.FLUTTERWAVE_LIVE_PUBLIC_KEY || 'xxxxxx',
                secretKey: process.env.FLUTTERWAVE_LIVE_SECRET_KEY || 'xxxxxx',
                encryptionKey: process.env.FLUTTERWAVE_LIVE_ENCRYPTION_KEY || 'xxxxxx',
                secretHash: process.env.FLUTTERWAVE_LIVE_SECRET_HASH || 'xxxxxx',
            },
            test: {
                publicKey: process.env.FLUTTERWAVE_TEST_PUBLIC_KEY || 'xxxxxx',
                secretKey: process.env.FLUTTERWAVE_TEST_SECRET_KEY || 'xxxxxx',
                encryptionKey: process.env.FLUTTERWAVE_TEST_ENCRYPTION_KEY || 'xxxxxx',
                secretHash: process.env.FLUTTERWAVE_TEST_SECRET_HASH || 'xxxxxx',
            },
            v3: {
                url: process.env.FLUTTERWAVE_V3_URL || 'https://api.flutterwave.com/v3',
            },
        },
    },
    mail: {
        resend: {
            apiKey: os.RESEND_API_KEY || 'xxxxxx',
        },
        host: os.MAIL_HOST || 'smtp.mailtrap.io',
        port: Number(os.MAIL_PORT) || 2525,
        secure: os.MAIL_SECURE === 'true' || false,
        auth: {
            user: os.MAIL_USER || 'user',
            pass: os.MAIL_PASSWORD || 'password',
        },
        from: os.MAIL_FROM || 'support@typescript-graphql-api-template.com',
        name: os.MAIL_NAME || 'typescript-graphql-api-template',
        template: {
            branding: {
                html: (title: string, body: string) => {
                    return `<!doctypehtml><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Account Signin Alert</title><body style=margin:0;padding:0;background-color:#0f1115;font-family:Arial,Helvetica,sans-serif><table cellpadding=0 cellspacing=0 style="background-color:#0f1115;padding:24px 0"width=100%><tr><td align=center><table cellpadding=0 cellspacing=0 style=max-width:520px;background-color:#151821;border-radius:12px;padding:32px width=100%><tr><td style=padding-bottom:24px><table cellpadding=0 cellspacing=0 align=left><tr><td style=padding-right:8px valign=middle><img src=https://swiftswapexchange.com/logo.png style=display:block width=36 height=36 alt=SwiftSwap><td valign=middle><span style=color:#1f4fd8;font-size:26px;font-weight:700;font-family:Arial,Helvetica,sans-serif;line-height:1;letter-spacing:-.3px>SwiftSwap</span></table><tr><td style=color:#fff;font-size:22px;font-weight:700;padding-bottom:16px>${title}<tr><td style=color:#d1d5db;font-size:15px;padding-bottom:12px>${body}<tr><td style=color:#9ca3af;font-size:13px;line-height:1.6;padding-bottom:24px>Questions or concerns? Reach us at <a href=mailto:support@swiftswapexchange.com style=color:#60a5fa;text-decoration:none>support@swiftswapexchange.com </a>or call <a href=tel:+2347052014541 style=color:#60a5fa;text-decoration:none>+234 705 201 4541</a><tr><td style=color:#d1d5db;font-size:14px;padding-bottom:20px>Regards,<br><strong>SwiftSwap.</strong><tr><td style=color:#9ca3af;font-size:12px;line-height:1.6;padding-bottom:20px>Your platform for trading crypto and paying utility bills. Download our app for Android and iOS.<tr><td style=padding-top:16px align=center><table cellpadding=0 cellspacing=0 align=center><tr><td style=padding-right:10px;line-height:0 align=center valign=middle><a href="https://play.google.com/store/apps/details?id=com.opensaucery.swiftswapp"style=display:inline-block;margin-right:10px><img src=https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png style=display:block width=140></a><td style=line-height:0 align=center valign=middle><a href=https://apps.apple.com/us/app/swiftswap/id6747611208><img src=https://image2url.com/images/1765997020118-13fc10e3-d6c6-4098-bb2a-14fcf033842a.png style=display:block width=125 height=35></a></table></table></table>`;
                },
            },
            passwordReset: {
                subject: `Let's Recover Your Password`,
                html: `<p>Hello {{firstname}},</p><p>As requested, Please click on the link below to reset your password.</p><p>{{link}}</p><p>This link will expire in 5 minutes.</p>`,
            },
            passwordAlert: {
                subject: `Password Change Alert`,
                html: `<p>Hello {{firstname}},</p><p>Your password was recently changed on {{time}} from device {{device}}.</p><p>If this was you, you can ignore this email.</p><p>If this wasn't you, please reset your password immediately!</p>`,
            },
            pinAlert: {
                subject: `Pin Change Alert`,
                html: `<p>Hello {{firstname}},</p><p>Your pin was recently changed on {{time}} from device {{device}}.</p><p>If this was you, you can ignore this email.</p><p>If this wasn't you, please reset your pin immediately!</p>`,
            },
            emailAlert: {
                subject: `Email Change Alert`,
                html: `<p>Hello {{firstname}},</p><p>Your email was recently changed to {{email}} on {{time}} from device {{device}}.</p><p>If this was you, you can ignore this email.</p><p>If this wasn't you, please contact support immediately!</p>`,
            },
            accountActivation: {
                subject: `Verify Your Email Address`,
                html: `<p>Hello {{firstname}},</p><p>As a part of your account completion process. Please click on the link below to verify your email.</p><p>{{link}}</p><p>This link will expire in 5 minutes.</p>`,
            },
            signinAlert: {
                subject: `Account Signin Alert`,
                html: `<p>Hello {{firstname}},</p><p>There was a new signin to your {{type}} account on {{time}} from device {{device}}.</p><p>If this was you, you can ignore this email.</p><p>If this wasn't you, please reset your password immediately!</p>`,
            },
            emailVerification: {
                subject: `Complete your verification`,
                html: `<p>Please continue your verification step by entering this code</p><p>{{code}}</p><p>The code expires in {{expiration}}.</p>`,
            },
            saleInitiated: {
                subject: `Transaction Initiated`,
                html: `<p>Hello {{firstname}},</p><p>Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been initiated.</p><p>We'll notify you once it has been completed by the system.</p>`,
                push: `Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been initiated.`,
            },
            saleCompleted: {
                subject: `Transaction Completed`,
                html: `<p>Hello {{firstname}},</p><p>Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been completed.</p><p>We've credited your account with {{exchangeCurrency}}{{amountt}}.</p>`,
                push: `Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been completed.`,
            },
            // undoSaleCompleted: {
            //     subject: `Transaction Completion Reversed`,
            //     html: `<p>Hello {{firstname}},</p><p>Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been reversed due to the following reason: {{reason}}.</p><p>We've deducted the credited amount from your account.</p>`,
            //     push: `Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been reversed.`,
            // },
            saleRejected: {
                subject: `Transaction Rejected`,
                html: `<p>Hello {{firstname}},</p><p>Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been rejected due to the following reason: {{reason}}.</p><p>Please contact support for more information.</p>`,
                push: `Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been rejected.`,
            },
            // undoSaleRejected: {
            //     subject: `Transaction Rejection Reversed`,
            //     html: `<p>Hello {{firstname}},</p><p>Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been reversed due to the following reason: {{reason}}.</p><p>We've credited the amount back to your account.</p>`,
            //     push: `Your transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been reversed.`,
            // },
            electricityPurchase: {
                subject: `Electricity Purchase`,
                html: `<p>Hello {{firstname}},</p><p>Your electricity purchase has been completed.</p><p>Please use the token below to activate your unit</p><p>{{token}}</p>`,
                push: `Your electricity purchase has been completed.`,
            },
            withdrawInitiated: {
                subject: `Withdrawal Initiated`,
                html: `<p>Hello {{firstname}},</p><p>Your withdrawal of {{baseCurrency}}{{amount}} has been initiated.</p><p>We'll notify you once it has been completed by the system.</p>`,
                push: `Your withdrawal of {{baseCurrency}}{{amount}} has been initiated.`,
            },
            withdrawCompleted: {
                subject: `Withdrawal Completed`,
                html: `<p>Hello {{firstname}},</p><p>Your withdrawal of {{baseCurrency}}{{amount}} has been completed.</p><p>Please check your bank account for the funds or contact support if you have any issues.</p>`,
                push: `Your withdrawal of {{baseCurrency}}{{amount}} has been completed.`,
            },
            withdrawRejected: {
                subject: `Withdrawal Rejected`,
                html: `<p>Hello {{firstname}},</p><p>Your withdrawal of {{baseCurrency}}{{amount}} has failed and the amount has been credited back to your wallet.</p><p>You can try again or contact support for help.</p>`,
                push: `Your withdrawal of {{baseCurrency}}{{amount}} has failed and the amount has been credited back to your wallet.`,
            },

            billPaymentFailed: {
                subject: `Bill Payment Failed`,
                html: `<p>Hello {{firstname}},</p><p>Your bill payment for {{baseCurrency}}{{amount}} of {{asset}} has failed and the amount has been credited back to your wallet.</p><p>You can try again or contact support for help.</p>`,
                push: `Your bill payment for {{baseCurrency}}{{amount}} of {{asset}} has failed and the amount has been credited back to your wallet.`,
            },

            vendorSaleInitiated: {
                subject: `Transaction Initiated`,
                html: `<p>Hello {{name}},</p><p>The following {{type}} transaction has been initiated by {{firstname}}.</p><p><b>Tx ID:</b> {{id}}</p><p><b>Tx Asset:</b> {{asset}}</p><p><b>Tx Amount:</b> {{amount}} {{baseCurrency}}</p><p><b>Tx Rate:</b> {{rate}} {{exchangeCurrency}}/{{baseCurrency}}</p><p><b>E-code:</b> {{code}}</p><p><b>Pin:</b> {{pin}}</p><p>Please find attached images of the transaction.</p>`,
                push: `A transaction to sell {{baseCurrency}}{{amount}} worth of {{asset}} has been initiated.`,
            },

            accountDeletion: {
                subject: `Account Deletion Confirmation`,
                html: `<p>Hello {{firstname}},</p><p>Your account deletion request has been processed successfully.</p><p>We're sorry to see you go. If you have any feedback, please let us know.</p>`,
                push: `Your account deletion request has been processed successfully.`,
            },

            signupAlert: {
                subject: `New User Signup`,
                html: `<p>Hello {{firstname}},</p><p>A new user has signed up with the following details:</p><p><b>Name:</b> {{name}}</p><p><b>Email:</b> {{email}}</p><p><b>Phone:</b> {{phone}}</p><p><b>Country:</b> {{country}}</p><p><b>Referral:</b> {{referral}}</p><p><b>Device:</b> {{device}}</p><p><b>Medium:</b> {{medium}}</p>`,
            },
        },
    },
    encryption: {
        cipherKey: process.env.ENCRYPTION_KEY!,
    },
};
