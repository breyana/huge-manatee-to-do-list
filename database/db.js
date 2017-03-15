const fs = require('fs')
if ( fs.existsSync('.env') ) {
  require('dotenv').config()
}

const connectionString = process.env.DATABASE_URL
const pgp = require('pg-promise')()
const db = pgp( connectionString )

const GET_ALL = 'SELECT * FROM tasklist ORDER BY task_id ASC'
const GET_ONE = 'SELECT * FROM tasklist WHERE task_id = $1'
const DELETE_ONE = 'DELETE FROM tasklist WHERE task_id = $1'
const CREATE_ONE = 'INSERT INTO tasklist(task) VALUES ($1)'
const UPDATE_ONE = 'UPDATE tasklist SET task = $2 WHERE task_id = $1'
const TOGGLE_COMPLETE = 'UPDATE tasklist SET complete = NOT complete WHERE task_id = $1'
// const UPDATE_PRIORITY = 'UPDATE tasklist SET priority = $2 WHERE id = $1'

const Todos = {
  getAll: () => {
    return db.any(GET_ALL,[])
  },

  getOne: (task_id) => {
    return db.one(GET_ONE, [task_id])
  },

  deleteOne: (task_id) => {
    return db.none(DELETE_ONE, [task_id])
  },

  createTask: (task) => {
    return db.none(CREATE_ONE, [task])
  },

  updateTask: (task_id, task) => {
    return db.none(UPDATE_ONE, [task_id, task])
  },

  toggleComplete: (task_id) => {
    console.log('IN THE DB-0--->',task_id);
    return db.none(TOGGLE_COMPLETE, [task_id])
  }

  // swapPriority: ( lowerTasks, higherTasks ) => {
  //   return Promise.all([ db.none(UPDATE_PRIORITY, lowerTasks),
  //     db.none(UPDATE_PRIORITY, higherTasks) ])
  // }

}

module.exports = { Todos }
