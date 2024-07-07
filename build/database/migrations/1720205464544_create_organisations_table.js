import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'organisations';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('org_id').primary().unique();
            table.string('name').notNullable();
            table.text('description').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1720205464544_create_organisations_table.js.map