import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'auth_access_tokens';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary().unique();
            table.string('type').notNullable();
            table.string('name').nullable();
            table.string('hash').notNullable();
            table.text('abilities').notNullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
            table.timestamp('last_used_at', { useTz: true }).nullable();
            table.timestamp('expires_at', { useTz: true }).nullable();
        });
        this.schema.alterTable(this.tableName, (table) => {
            table
                .uuid('tokenable_id')
                .notNullable()
                .unsigned()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1720173988055_create_access_tokens_table.js.map