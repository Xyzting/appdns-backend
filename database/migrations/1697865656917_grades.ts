import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'grades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('student_id')
        .unsigned()
        .references('students.id')
        .onDelete('CASCADE')
      table
        .integer('subject_id')
        .unsigned()
        .references('subjects.id')
        .onDelete('CASCADE')
      table.string('jenis_nilai')
      table.float('nilai')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
