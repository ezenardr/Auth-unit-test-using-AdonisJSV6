import User from '#models/user';
import { registerOrganisationValidation } from '#validators/organisation_registration';
import Organisation from '#models/organisation';
export default class OrganisationsController {
    async getUsersOrganisations({ auth, response }) {
        const user = auth.user;
        const organisations = await user.related('organisations').query();
        const orgFil = organisations.map((organisation) => {
            return {
                orgId: organisation.orgId,
                name: organisation.name,
                description: organisation.description,
            };
        });
        return response.json({
            status: 'success',
            message: 'Fetch success',
            data: {
                organisations: orgFil,
            },
        });
    }
    async createOrganisation({ request, auth, response }) {
        const body = request.only(['name', 'description']);
        const payload = await registerOrganisationValidation.validate(body);
        const user = auth.user;
        try {
            const newOrganisation = await Organisation.create(payload);
            await user.related('organisations').attach([newOrganisation.orgId]);
            return response.json({
                status: 'success',
                message: 'Organisation created successfully',
                data: {
                    orgId: newOrganisation.orgId,
                    name: newOrganisation.name,
                },
            });
        }
        catch (e) {
            response.safeStatus(400);
            response.json({
                status: 'Bad request',
                message: 'Client Error',
                statusCode: 400,
            });
        }
    }
    async getUniqueOrganisations({ auth, request, response }) {
        const { orgId } = request.params();
        const user = auth.user;
        try {
            const organisations = await user.related('organisations').query();
            const orgFil = organisations
                .map((organisation) => {
                return {
                    orgId: organisation.orgId,
                    name: organisation.name,
                    description: organisation.description,
                };
            })
                .filter((org) => org.orgId === orgId);
            return response.json({
                status: 'success',
                message: 'Fetch success',
                data: orgFil,
            });
        }
        catch (e) {
            response.safeStatus(400);
            return response.json({
                status: 'Bad request',
                message: 'Client error',
                statusCode: 400,
            });
        }
    }
    async addUserToOrganisation({ request, response }) {
        const { orgId } = request.params();
        const { userId } = request.body();
        try {
            const userToAdd = await User.find(userId);
            if (userToAdd) {
                await userToAdd.related('organisations').attach([orgId]);
                return response.json({
                    status: 'Success',
                    message: 'User added to organisation successfully',
                });
            }
        }
        catch (e) {
            response.safeStatus(400);
            return response.json({
                status: 'Bad request',
                message: 'Failed to add user to organisation',
            });
        }
    }
}
//# sourceMappingURL=organisations_controller.js.map