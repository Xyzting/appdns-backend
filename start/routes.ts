/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
   
Route.get('/', async ({ response }) => {
  return response.send({
    msg: "Hello World!"
  })
})

Route.group(() => {

  // Students
  Route.get('/students', 'StudentsController.getAll');
  Route.get('/students/:id', 'StudentsController.getOne');
  Route.post('/students', 'StudentsController.create');
  Route.put('/students/:id', 'StudentsController.update');
  Route.delete('/students/:id', 'StudentsController.destroy');

  // Subjects
  Route.get('/subjects', 'SubjectsController.getAll');
  Route.get('/subjects/:id', 'SubjectsController.getOne');
  Route.post('/subjects', 'SubjectsController.create');
  Route.put('/subjects/:id', 'SubjectsController.update');
  Route.delete('/subjects/:id', 'SubjectsController.destroy');

  // Grade
  Route.get('/grades', 'GradesController.getAll');
  Route.get('/grades/:id', 'GradesController.getOne');
  Route.post('/grades', 'GradesController.create');
  Route.put('/grades/:id', 'GradesController.update');
  Route.delete('/grades/:id', 'GradesController.destroy');

}).prefix('/api')
