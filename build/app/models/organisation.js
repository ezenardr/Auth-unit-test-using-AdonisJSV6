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
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm';
import { v4 as uuidv4 } from 'uuid';
import User from '#models/user';
export default class Organisation extends BaseModel {
    static assingUUID(organisation) {
        organisation.orgId = uuidv4();
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", String)
], Organisation.prototype, "orgId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Organisation.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Organisation.prototype, "description", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Organisation.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Organisation.prototype, "updatedAt", void 0);
__decorate([
    manyToMany(() => User, {
        pivotTable: 'organisation_users',
        localKey: 'orgId',
        relatedKey: 'userId',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'org_id',
        pivotTimestamps: true,
    }),
    __metadata("design:type", Object)
], Organisation.prototype, "users", void 0);
__decorate([
    beforeCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Organisation]),
    __metadata("design:returntype", void 0)
], Organisation, "assingUUID", null);
//# sourceMappingURL=organisation.js.map