var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens';
import { v4 as uuidv4 } from 'uuid';
import Organisation from '#models/organisation';
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
});
export default class User extends compose(BaseModel, AuthFinder) {
    static accessTokens = DbAccessTokensProvider.forModel(User, {
        expiresIn: '2 days',
    });
    static assingUUID(user) {
        user.userId = uuidv4();
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], User.prototype, "phone", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], User.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    manyToMany(() => Organisation, {
        pivotTable: 'organisation_users',
        localKey: 'userId',
        relatedKey: 'orgId',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'org_id',
        pivotTimestamps: true,
    }),
    __metadata("design:type", Object)
], User.prototype, "organisations", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], User, "assingUUID", null);
//# sourceMappingURL=user.js.map