import mongoose from 'mongoose';

export interface IUser {
    _id: string | mongoose.ObjectId;
    email: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    country: string;
    referral: string;
    otp: string;
    expiry: Date;
    pin: string;
    locked: boolean;
    biometrics: boolean;
}

export interface IPlatform {
    id: mongoose.ObjectId;
    _id: mongoose.ObjectId;
    iosVersion: string;
    androidVersion: string;
    forceVersion: boolean;
    youtube: string;
}
