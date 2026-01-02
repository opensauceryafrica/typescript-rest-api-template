export interface IDojahKycResponse {
    error: string;
    entity: {
        bvn: string;
        nin: string;
        nin_checksum: string;
        bvn_checksum: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        date_of_birth: string;
        phone_number1: string;
        phone_number2: string;
        gender: string;
        image: string;
        selfie_image_url: string;
        selfie_verification: {
            confidence_value: number;
            match: boolean;
        };
    };
}
