import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'organisation_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('organisation_user_id').unsigned().primary().unique()
      table.uuid('user_id').references('user_id').inTable('users').onDelete('CASCADE')
      table.uuid('org_id').references('org_id').inTable('organisations').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
