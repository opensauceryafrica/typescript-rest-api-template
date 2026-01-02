import * as bcrypt from './bcrypt';

describe('bcrypt', () => {
    describe('generateEncryption', () => {
        it('should generate hashed password', () => {
            const password = 'password';
            const hashedPassword = bcrypt.generateEncryption(password);
            expect(hashedPassword).not.toEqual(password);
        });
    });

    describe('compareEncryption', () => {
        it('should return true if password is correct', () => {
            const password = 'password';
            const hashedPassword = bcrypt.generateEncryption(password);
            const isCorrect = bcrypt.compareEncryption(password, hashedPassword);
            expect(isCorrect).toEqual(true);
        });

        it('should return false if password is incorrect', () => {
            const password = 'password';
            const hashedPassword = bcrypt.generateEncryption(password);
            const isCorrect = bcrypt.compareEncryption('wrong-password', hashedPassword);
            expect(isCorrect).toEqual(false);
        });
    });
});
