import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Grades from './Grades'

export default class Subject extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nama: string

  @column()
  public bobot: number
  
  @hasMany(() => Grades)
  public grades: HasMany<typeof Grades>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}
