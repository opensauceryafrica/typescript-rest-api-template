import axios, { AxiosError } from 'axios';
import env from '../config/env';
import { MakeResponse } from '../types/misc/generic';
import { IDojahKycResponse } from '../types/misc/dojah';

export const verifySelfieBvn = async (bvnNumber: string, selfie: string): Promise<MakeResponse<IDojahKycResponse>> => {
    try {
        const response = await axios.post(
            `${env.services.dojah.url}/api/v1/kyc/bvn/verify`,
            {
                bvn: bvnNumber,
                selfie_image: selfie,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${env.services.dojah.privateKey}`,
                    AppId: env.services.dojah.appId,
                },
            },
        );
        return {
            status: true,
            message: 'BVN verified successfully',
            data: response.data,
        };
    } catch (error) {
        return {
            status: false,
            message: 'BVN verification failed',
            data: (error as AxiosError).response?.data as IDojahKycResponse,
        };
    }
};

export const verifySelfieNin = async (ninNumber: string, selfie: string): Promise<MakeResponse<IDojahKycResponse>> => {
    try {
        const response = await axios.post(
            `${env.services.dojah.url}/api/v1/kyc/nin/verify`,
            {
                nin: ninNumber,
                selfie_image: selfie,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${env.services.dojah.privateKey}`,
                    AppId: env.services.dojah.appId,
                },
            },
        );
        return {
            status: true,
            message: 'NIN verified successfully',
            data: response.data,
        };
    } catch (error) {
        return {
            status: false,
            message: 'NIN verification failed',
            data: (error as AxiosError).response?.data as IDojahKycResponse,
        };
    }
};
