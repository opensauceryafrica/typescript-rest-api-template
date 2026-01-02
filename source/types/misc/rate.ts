import mongoose from 'mongoose';
import { RateType } from './enum';

export interface IRateFilter {
    id?: string;
    type?: RateType;
    search?: string;
    active?: string;
    paginate?: string;
    page?: string;
    limit?: string;
}

export interface IUtilityFilter {
    category: string;
}

export interface IVendor {
    name: string;
    products: {
        id: string;
        name: string;
        amount: {
            fixed: string;
            minimum: string;
            maximum: string;
        };
    }[];
}

export interface IAirtime {
    name: string;
    logo: string;
    min: number;
    max: number;
}

export interface IData {
    name: string;
    logo: string;
    products: {
        id: string;
        name: string;
        amount: number;
    }[];
}
