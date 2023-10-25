import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator } from '@ioc:Adonis/Core/Validator'
import Student from 'App/Models/Students'
import { studentsCreateValidator, studentsUpdateValidator } from 'App/Validators/rulesValidate';

export default class StudentsController {

  public async getAll({response}: HttpContextContract) {
    try{
      const students = await Student.query().preload('grades');
  
      return response.send({
        statusCode: 200,
        data: students
      });
    }catch(err){
      return response.status(404).send({
        statusCode: 404,
        msg: err
      });
    }
  }

  public async getOne({params, response}: HttpContextContract) {
    try{
      const id = params.id
      const students = await Student.findByOrFail('id', id);
      await students.load('grades');

      return response.send({
        statusCode: 200,
        data: students
      });
    }catch(err){
      return response.status(404).send({
        statusCode: 404,
        msg: err
      });
    }
  }

  public async create({response, request}: HttpContextContract) {
    try{
      const validData = await request.validate({ 
        schema: studentsCreateValidator, 
        reporter: validator.reporters.api, 
        messages: {
          required: '{{ field }} is required to create a student',
          unique: '{{ field }} is should unique data',
          minLength: '{{ field }} should must be 4 types'
        }
      })

      const student = await Student.create(validData)
      await student?.save()

      response.send({
        statusCode: 201,
        data: student
      })
    }catch(err){
      return response.status(400).send({
        msg: err
      });
    }
  } 

  public async update({params, request, response}: HttpContextContract) {
    try{
      const id = params.id;
      const student = await Student.findBy('id', id);

      if(!student){
        return response.status(404).send({
          statusCode: 404,
          msg: "Data not found!"
        })
      }
      if(request.body().nomor_induk === student.nomor_induk ){
        
        const validData = await request.validate({ 
          schema: studentsUpdateValidator, 
          reporter: validator.reporters.api,
          messages: {
            required: '{{ field }} is required to update a student',
            unique: '{{ field }} is should unique data',
            minLength: '{{ field }} must be more than 5 letters',
            maxLength: '{{ field }} must not exceed 255 letters'
          }
        })

        student?.merge(validData);
        await student?.save();

      }else {

        const validData = await request.validate({ 
          schema: studentsCreateValidator, 
          reporter: validator.reporters.api,
          messages: {
            required: '{{ field }} is required to update a student',
            unique: '{{ field }} is should unique data',
            minLength: '{{ field }} must be more than 5 letters',
            maxLength: '{{ field }} must not exceed 255 letters'
          }
        })

        student?.merge(validData);
        await student?.save();

      }

      response.send({
        statusCode: 200,
        data: student
      })
    }catch(err){
      return response.status(400).send({
        msg: err.messages.errors[0].message
      });
    } 
  }

  public async destroy({params, response}: HttpContextContract) {
      const id = params.id
      const student = await Student.findByOrFail('id', id)

      await student.delete()

      response.status(200).send({
        statusCode: 200,
        msg: 'Delete successfully'
      })
  }
}
