import axios, { AxiosError } from 'axios';
import env from '../config/env';
import { MakeResponse } from '../types/misc/generic';
import * as redis from '../database/redis';

export const banks = async (): Promise<MakeResponse> => {
    try {
        let res = await (await redis.createConnection()).get('banks');
        if (res) {
            return JSON.parse(res);
        }

        const response = await axios.get(`${env.services.lenco.api}/banks`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.services.lenco.apiKey}`,
            },
            timeout: 10000,
        });

        await (await redis.createConnection()).setEx('banks', 60 * 60 * 24, JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        return {
            status: false,
            message: 'Failed to fetch banks',
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};

export const resolve = async (accountNumber: string, bankCode: string) => {
    try {
        const response = await axios.get(`${env.services.lenco.api}/resolve`, {
            params: { accountNumber, bankCode },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.services.lenco.apiKey}`,
            },
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            message: 'Failed to resolve account',
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};

export const utilities = async (category: string): Promise<MakeResponse> => {
    try {
        const response = await axios.get(`${env.services.lenco.api}/bills/vendors/by-category/${category}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.services.lenco.apiKey}`,
            },
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            message: `Failed to fetch utilities for ${category.replace('-', ' ')}`,
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};

export const utility = async (id: string): Promise<MakeResponse> => {
    try {
        const response = await axios.get(`${env.services.lenco.api}/bills/products/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.services.lenco.apiKey}`,
            },
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            message: 'Failed to buy airtime',
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};

export const util = async (utility: string, id: string, amount?: number): Promise<MakeResponse> => {
    try {
        const response = await axios.post(
            `${env.services.lenco.api}/bills`,
            {
                productId: utility,
                customerId: id,
                debitAccountId: env.services.lenco.debitAccountId,
                amount: amount?.toString(),
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${env.services.lenco.apiKey}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        return {
            status: false,
            message: 'Failed to buy utility',
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};

export const withdraw = async (
    accountNumber: string,
    bankCode: string,
    amount: number,
    reference: string,
): Promise<MakeResponse> => {
    try {
        const response = await axios.post(
            `${env.services.lenco.api}/transactions`,
            {
                accountId: env.services.lenco.debitAccountId,
                accountNumber,
                bankCode,
                amount: amount.toString(),
                narration: `${env.name} Withdrawal`,
                reference,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${env.services.lenco.apiKey}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        return {
            status: false,
            message: 'Failed to withdraw',
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};

export const bill = async (id: string): Promise<MakeResponse> => {
    try {
        const response = await axios.get(`${env.services.lenco.api}/bill/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.services.lenco.apiKey}`,
            },
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            message: 'Failed to get bill',
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};

export const tx = async (id: string): Promise<MakeResponse> => {
    try {
        const response = await axios.get(`${env.services.lenco.api}/transaction/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${env.services.lenco.apiKey}`,
            },
        });
        return response.data;
    } catch (error) {
        return {
            status: false,
            message: 'Failed to get transaction',
            data: (error as AxiosError).response?.data as Record<string, unknown>,
        };
    }
};
