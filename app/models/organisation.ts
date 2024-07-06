import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Organisation extends BaseModel {
  @column({ isPrimary: true })
  declare orgId: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => User, {
    pivotTable: 'organisation_users',
    localKey: 'orgId',
    relatedKey: 'userId',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'org_id',
    pivotTimestamps: true,
    // onQuery: (query) => {
    //   query.where('user_id',)
    // },
  })
  declare users: ManyToMany<typeof User>

  // @manyToMany(() => User, {
  //   pivotTable: 'organisation_users',
  // })
  // declare users: ManyToMany<typeof User>

  @beforeCreate()
  static assingUUID(organisation: Organisation) {
    organisation.orgId = uuidv4()
  }
}
