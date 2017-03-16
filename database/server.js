const express = require('express')
const app = express()
const cors = require('cors')
const pgp = require('pg-promise')()
const bodyParser = require('body-parser')

const { Todos } = require('./db.js')

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( cors() );

app.get('/', function(request, response) {
  Todos.getAll()
    .then( (results) => response.json(results) )
})

app.get('/:id', function(request, response) {
  const { id } = request.params
  Todos.getOne(id)
    .then( (results) => response.json(results))
})

app.delete('/:id', function (request, response) {
  const { id } = request.params
  Todos.deleteOne(id)
    .then( () => response.json({1: 'success'}) )
})

app.post('/', function (request, response) {
  const { task } = request.body
  Todos.createTask(task)
    .then( () => response.json({1: 'posted'}) )
})

app.put('/priority', function (request, response) {
  const {higherTasks, lowerTasks} = request.body
  Todos.swapPriority( lowerTasks, higherTasks )
    .then( () => response.json({1: 'complete swap'}) )
})

app.put('/complete/:id', function(request, response) {
  const { id } = request.params
  Todos.toggleComplete(id)
    .then( () => response.json({1: 'complete set'}) )
})

app.put('/:id', function(request, response) {
  const id = request.params.id
  const {task} = request.body
  Todos.updateTask(id, task)
    .then( () => response.json({1: 'updated'}) )
})

app.listen(5000, function() {
  console.log('Database API for Huge Manatee is listening on port 5000!')
})
