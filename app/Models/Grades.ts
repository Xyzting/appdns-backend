import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Student from './Students'
import Subjects from './Subjects'
import ValueType from './ValueTypes'

export default class Grades extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>

  @column()
  public subjectId: number

  @belongsTo(() => Subjects)
  public subject: BelongsTo<typeof Subjects>

  @column()
  public valueTypeId: number

  @belongsTo(() => ValueType)
  public valueType: BelongsTo<typeof ValueType>

  @column()
  public jenis_nilai: string

  @column()
  public nilai: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
