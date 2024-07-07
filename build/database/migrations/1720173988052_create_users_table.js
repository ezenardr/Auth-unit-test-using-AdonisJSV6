import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'users';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('user_id').notNullable().unique().primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('email', 254).notNullable().unique();
            table.string('password').notNullable();
            table.string('phone').nullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1720173988052_create_users_table.js.map