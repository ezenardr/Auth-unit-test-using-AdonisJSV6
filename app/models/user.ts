import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { v4 as uuidv4 } from 'uuid'
import Organisation from '#models/organisation'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '2 days',
  })
  @column({ isPrimary: true })
  declare userId: string
  @column()
  declare firstName: string
  @column()
  declare lastName: string
  @column()
  declare email: string
  @column({ serializeAs: null })
  declare password: string
  @column()
  declare phone: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Organisation, {
    pivotTable: 'organisation_users',
    localKey: 'userId',
    relatedKey: 'orgId',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'org_id',
    pivotTimestamps: true,
  })
  declare organisations: ManyToMany<typeof Organisation>

  @beforeCreate()
  static assingUUID(user: User) {
    user.userId = uuidv4()
  }
}
