import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const studentsCreateValidator = schema.create({
  nomor_induk: schema.string({}, [
    rules.required(),
    rules.unique({table: 'students', column: 'nomor_induk'}),
  ]),
  nama: schema.string({}, [
    rules.required(),
    rules.minLength(4),
    rules.maxLength(255)
  ]),
  tanggal_lahir: schema.date({
    format: 'yyyy-MM-dd'
  }, [
    rules.required(),
  ]),
  alamat: schema.string({}, [
    rules.required(),
  ])
})

export const studentsUpdateValidator = schema.create({
  nama: schema.string({}, [
    rules.required(),
    rules.minLength(4),
    rules.maxLength(255)
  ]),
  tanggal_lahir: schema.date({
    format: 'yyyy-mm-dd'
  }, [
    rules.required(),
  ]),
  alamat: schema.string({}, [
    rules.required(),
  ])
})

export const subjectsValidator = schema.create({
  nama: schema.string({}, [
    rules.required(),
    rules.minLength(4),
    rules.unique({ table: "subjects", column: "nama" }),
    rules.maxLength(255)
  ]),
  bobot: schema.number()
})

export const gradesValidator = schema.create({
  student_id: schema.number([
    rules.required(),
    rules.exists({table: "students", column: 'id'})
  ]),
  subject_id: schema.number([
    rules.required(),
    rules.exists({table: "subjects", column: 'id'})
  ]),
  jenis_nilai: schema.string({}, [
    rules.required(),
    rules.minLength(5),
  ]),
  nilai: schema.number()
})