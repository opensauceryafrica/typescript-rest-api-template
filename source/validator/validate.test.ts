import validate from './validate';
import * as auth from './user/auth';

describe('validate', () => {
    it('should makeResponse with status true', () => {
        const result = validate(auth.signin, {
            email: 'john@doe.com',
            password: 'password',
        });
        expect(result).toEqual({ status: true, message: '', data: {} });
    });
    it('should makeResponse with status false', () => {
        const result = validate(auth.signin, {
            email: '',
            password: 'password',
        });
        expect(result).toEqual({
            status: false,
            message: 'email is not allowed to be empty',
            data: {},
        });
    });
});
