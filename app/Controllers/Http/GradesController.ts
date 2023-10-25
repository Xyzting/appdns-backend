import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator } from '@ioc:Adonis/Core/Validator'
import Grades from 'App/Models/Grades'
import { gradesValidator } from 'App/Validators/rulesValidate';

export default class GradesController {

  public async getAll({response}: HttpContextContract) {
    try{
      const grades = await Grades.query().preload('student').preload('subject');

      return response.send({
        statusCode: 200,
        data: grades
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
      const grades = await Grades.findByOrFail('id', id);
      await grades.load("student")
      await grades.load("subject")

      return response.send({
        statusCode: 200,
        data: grades
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
        schema: gradesValidator, 
        reporter: validator.reporters.api, 
        messages: {
          required: '{{ field }} is required to create a grade',
          exists: '{{ field }} is not found in table',
          minLength: '{{ field }} must be more than 5 letters',
          number: '{{ field }} is should number or float data',
          maxLength: '{{ field }} must not exceed 255 letters'
        }
      })

      const grades = await Grades.create(validData)
      await grades.save()

      response.send({
        statusCode: 201,
        data: grades
      })
    }catch(err){
      return response.status(400).send({
        msg: err.messages.errors[0].message
      });
    }
  } 

  public async update({params, request, response}: HttpContextContract) {
    try{
      const id = params.id;
      const grades = await Grades.findBy('id', id);

      if(!grades){
        return response.status(404).send({
          statusCode: 404,
          msg: "Data not found!"
        })
      }

      const validData = await request.validate({ 
        schema: gradesValidator, 
        reporter: validator.reporters.api, 
        messages: {
          required: '{{ field }} is required to update a grade',
          exists: '{{ field }} is not found in table',
          minLength: '{{ field }} must be more than 5 letters',
          number: '{{ field }} is should number or float data',
          maxLength: '{{ field }} must not exceed 255 letters'       
        }
      })

      grades?.merge(validData);
      await grades?.save();

      response.send({
        statusCode: 200,
        data: grades
      })
    }catch(err){
      return response.status(400).send({
        msg: err.messages.errors[0].message
      });
    } 
  }

  public async destroy({params, response}: HttpContextContract) {
      const id = params.id
      const grades = await Grades.findByOrFail('id', id)

      await grades.delete()

      response.status(200).send({
        statusCode: 200,
        msg: 'Delete successfully'
      })
  }
}
