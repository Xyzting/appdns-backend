import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator } from '@ioc:Adonis/Core/Validator'
import Subject from 'App/Models/Subjects'
import { subjectsValidator } from 'App/Validators/rulesValidate';

export default class SubjectsController {

  public async getAll({response}: HttpContextContract) {
    try{
      const subjects = await Subject.query().preload("grades");

      return response.send({
        statusCode: 200,
        data: subjects
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
      const subjects = await Subject.findBy('id', id);

      return response.send({
        statusCode: 200,
        data: subjects
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
        schema: subjectsValidator, 
        reporter: validator.reporters.api,
        messages: {
          required: '{{ field }} is required to create a subject',
          unique: '{{ field }} is should unique data',
          number: '{{ field }} is should number or float data',
          minLength: '{{ field }} must be more than 5 letters',
          maxLength: '{{ field }} must not exceed 255 letters'
        }
      })

      const subjects = await Subject.create(validData)
      await subjects.save()

      response.send({
        statusCode: 201,
        data: subjects
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
      const subjects = await Subject.findByOrFail('id', id);
      await subjects.load("grades");

      if(!subjects){
        return response.status(404).send({
          statusCode: 404,
          msg: "Data not found!"
        })
      }

      const validData = await request.validate({ 
        schema: subjectsValidator, 
        reporter: validator.reporters.api,
        messages: {
          required: '{{ field }} is required to update a subject',
          unique: '{{ field }} is should unique data',
          number: '{{ field }} is should number or float data',
          minLength: '{{ field }} must be more than 5 letters',
          maxLength: '{{ field }} must not exceed 255 letters'
        }
      })

      subjects?.merge(validData);
      await subjects?.save();

      response.send({
        statusCode: 200,
        data: subjects
      })
    }catch(err){
      return response.status(400).send({
        msg: err.messages.errors[0].message
      });
    } 
  }

  public async destroy({params, response}: HttpContextContract) {
      const id = params.id
      const subjects = await Subject.findByOrFail('id', id)

      await subjects.delete()

      response.status(200).send({
        statusCode: 200,
        msg: 'Delete successfully'
      })
  }
}
