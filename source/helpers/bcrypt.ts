import bcrypt from 'bcrypt';

export const generateEncryption = (payload: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(payload, salt);
};

export const compareEncryption = (payload: string, hash: string) => {
    return bcrypt.compareSync(payload, hash);
};
