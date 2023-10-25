import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Grades from './Grades'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nomor_induk: string
  
  @column()
  public nama: string
  
  @column()
  public alamat: string
  
  @column.date()
  public tanggal_lahir: DateTime

  @hasMany(() => Grades)
  public grades: HasMany<typeof Grades>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
}
