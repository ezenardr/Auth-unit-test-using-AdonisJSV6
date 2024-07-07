import { registerUserValidator } from '#validators/user_registration';
import User from '#models/user';
import Organisation from '#models/organisation';
export default class UsersController {
    async register({ request, response }) {
        const body = request.all();
        const payload = await registerUserValidator.validate(body);
        try {
            const newUser = await User.create(payload);
            const token = await User.accessTokens.create(newUser);
            const newOrganisation = await Organisation.create({
                name: `${newUser.firstName}'s Organisation`,
            });
            await newUser.related('organisations').attach([newOrganisation.orgId]);
            response.safeStatus(201);
            return response.json({
                status: 'success',
                message: 'Registration successfully',
                data: {
                    accessToken: token.toJSON().token,
                    user: {
                        userId: newUser.userId,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        phone: newUser.phone,
                    },
                },
            });
        }
        catch (err) {
            response.safeStatus(400);
            return response.json({
                status: 'Bad request',
                message: 'Registration unsuccessful',
                statusCode: 400,
            });
        }
    }
    async login({ request, response }) {
        const body = request.only(['email', 'password']);
        try {
            const user = await User.verifyCredentials(body.email, body.password);
            const token = await User.accessTokens.create(user);
            return response.ok({
                status: 'success',
                message: 'Registration successfully',
                data: {
                    accessToken: token.toJSON().token,
                    user: {
                        userId: user.userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                    },
                },
            });
        }
        catch (err) {
            response.safeStatus(404);
            return response.json({
                status: 'Bad request',
                message: 'Authentication failed',
                statusCode: 404,
            });
        }
    }
    async getUserById({ request, response }) {
        const { id } = request.params();
        try {
            const user = await User.find(id);
            if (user) {
                return response.json({
                    status: 'success',
                    message: 'User found',
                    data: {
                        userId: user.userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                    },
                });
            }
        }
        catch (e) {
            return response.json({
                status: 'Bad request',
                message: 'User not Found',
                statusCode: 404,
            });
        }
    }
}
//# sourceMappingURL=users_controller.js.map