import { test } from '@japa/runner';
test.group('User login', () => {
    test('login successfull', async ({ client }) => {
        const response = await client.post('/auth/login').fields({
            email: 'ezenardr.dev@gmail.com',
            password: '11111111',
        });
        response.assertStatus(200);
    });
});
//# sourceMappingURL=user_login.spec.js.map