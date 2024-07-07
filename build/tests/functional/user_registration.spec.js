import { test } from '@japa/runner';
test.group('User registration', () => {
    test('duplicate user', async ({ client }) => {
        const response = await client.post('/auth/register').fields({
            email: 'ezenardr.dev@gmail.com',
            firstName: 'Rodolphe',
            lastName: 'Ezenard',
            password: '11111111',
        });
        response.assertStatus(400);
        response.assertBody({
            status: 'Bad request',
            message: 'Registration unsuccessful',
            statusCode: 400,
        });
    });
    test('required email', async ({ client }) => {
        const response = await client.post('/auth/register').fields({
            firstName: 'Rodolphe',
            lastName: 'Ezenard',
            password: '11111111',
        });
        response.assertStatus(422);
        response.assertBody({
            errors: [
                {
                    message: 'The email field must be defined',
                    rule: 'required',
                    field: 'email',
                },
            ],
        });
    });
    test('required firstName', async ({ client }) => {
        const response = await client.post('/auth/register').fields({
            email: 'test@gmail.com',
            lastName: 'Ezenard',
            password: '11111111',
        });
        response.assertStatus(422);
        response.assertBody({
            errors: [
                {
                    message: 'The firstName field must be defined',
                    rule: 'required',
                    field: 'firstName',
                },
            ],
        });
    });
    test('required lastName', async ({ client }) => {
        const response = await client.post('/auth/register').fields({
            email: 'test@gmail.com',
            firstName: 'Rodolphe',
            password: '11111111',
        });
        response.assertStatus(422);
        response.assertBody({
            errors: [
                {
                    message: 'The lastName field must be defined',
                    rule: 'required',
                    field: 'lastName',
                },
            ],
        });
    });
    test('required password', async ({ client }) => {
        const response = await client.post('/auth/register').fields({
            email: 'test@gmail.com',
            firstName: 'Rodolphe',
            lastName: 'Ezenard',
        });
        response.assertStatus(422);
        response.assertBody({
            errors: [
                {
                    message: 'The password field must be defined',
                    rule: 'required',
                    field: 'password',
                },
            ],
        });
    });
    test('registration/organisation successfull', async ({ client }) => {
        const response = await client.post('/auth/register').fields({
            email: 'ezenard22@gmail.com',
            firstName: 'Rodolphe',
            lastName: 'Ezenard',
            password: '11111111',
        });
        response.assertStatus(201);
        console.log(response.body());
    });
});
//# sourceMappingURL=user_registration.spec.js.map