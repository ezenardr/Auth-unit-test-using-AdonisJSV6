import vine from '@vinejs/vine';
export const registerUserValidator = vine.compile(vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
}));
//# sourceMappingURL=user_registration.js.map