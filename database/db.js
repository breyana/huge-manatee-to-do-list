const fs = require('fs')
if ( fs.existsSync('.env') ) {
  require('dotenv').config()
}

const connectionString = process.env.DATABASE_URL
const pgp = require('pg-promise')()
const db = pgp( connectionString )

const GET_ALL = 'SELECT * FROM tasklist ORDER BY priority ASC'
const GET_ONE = 'SELECT * FROM tasklist WHERE task_id = $1'
const DELETE_ONE = 'DELETE FROM tasklist WHERE task_id = $1'
const CREATE_ONE = 'INSERT INTO tasklist(task) VALUES ($1)'
const UPDATE_ONE = 'UPDATE tasklist SET task = $2 WHERE task_id = $1'
const TOGGLE_COMPLETE = 'UPDATE tasklist SET complete = NOT complete WHERE task_id = $1'
const UPDATE_PRIORITY = 'UPDATE tasklist SET priority = $2 WHERE id = $1'

const Todos = {
  getAll: () => db.any(GET_ALL,[]),

  getOne: (task_id) => db.one(GET_ONE, [task_id]),

  deleteOne: (task_id) => db.none(DELETE_ONE, [task_id]),

  createTask: (task) => db.none(CREATE_ONE, [task]),

  updateTask: (task_id, task) => db.none(UPDATE_ONE, [task_id, task]),

  toggleComplete: (task_id) => db.none(TOGGLE_COMPLETE, [task_id]),

  swapPriority: ( lowerTasks, higherTasks ) => {
    return Promise.all([ db.none(UPDATE_PRIORITY, lowerTasks),
      db.none(UPDATE_PRIORITY, higherTasks) ])
  }

}

module.exports = { Todos }
