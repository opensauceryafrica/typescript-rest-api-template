export enum Country {
    NG = 'NG',
    GH = 'GH',
    KE = 'KE',
}

export enum Theme {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}

export enum Currency {
    NGN = 'NGN',
    GHS = 'GHS',
    KES = 'KES',
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
}

export const Currencies = Object.freeze({
    [Country.NG]: Currency.NGN,
    [Country.GH]: Currency.GHS,
    [Country.KE]: Currency.KES,
});

export const PhoneCodes = Object.freeze({
    [Country.NG]: '+234',
    [Country.GH]: '+233',
    [Country.KE]: '+254',
});

export enum TxType {
    CRYPTOSALE = 'CRYPTOSALE',
    GIFTCARDSALE = 'GIFTCARDSALE',
    AIRTIMEBUY = 'AIRTIMEBUY',
    INTERNETBUY = 'INTERNETBUY',
    WITHDRAWAL = 'WITHDRAWAL',
    ELECTRICITYBUY = 'ELECTRICITYBUY',
    CABLEBUY = 'CABLEBUY',
    BETTINGBUY = 'BETTINGBUY',
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
}

export enum TxStatus {
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    PENDING = 'PENDING',
    REFUNDED = 'REFUNDED',
}

export enum RateType {
    CRYPTO = 'CRYPTO',
    GIFTCARD = 'GIFTCARD',
    REFERRAL = 'REFERRAL',
}

export enum RateFor {
    CRYPTO = 'CRYPTO',
    GIFTCARD = 'GIFTCARD',
}

export enum RewardStatus {
    ISSUED = 'ISSUED',
    REVERSED = 'REVERSED',
}

export enum BankStatus {
    POORNETWORK = 'Poor Network',
    FAIRNETWORK = 'Fair Network',
    GOODNETWORK = 'Good Network',
}

export enum AnnouncementChannel {
    EMAIL = 'EMAIL',
    PUSH = 'PUSH',
    INAPP = 'INAPP',
}

export enum Medium {
    WHATSAPP = 'WHATSAPP',
    TELEGRAM = 'TELEGRAM',
    FACEBOOK = 'FACEBOOK',
    INSTAGRAM = 'INSTAGRAM',
    TWITTER = 'TWITTER',
    LINKEDIN = 'LINKEDIN',
    X = 'X',
    FRIEND = 'FRIEND',
    OTHER = 'OTHER',
}

export enum LencoEvent {
    BILL_PAYMENT_SUCCESSFUL = 'bill-payment.successful',
    BILL_PAYMENT_FAILED = 'bill-payment.failed',
    TX_SUCCESSFUL = 'transaction.successful',
    TX_FAILED = 'transaction.failed',
}
