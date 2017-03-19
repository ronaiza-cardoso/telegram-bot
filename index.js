'use strict'

const Telegram              = require('telegram-node-bot')
const TodoController        = require('./controllers/todo.js')
const OtherwiseController   = require('./controllers/otherwise.js')
const todoController        = new TodoController()

const tg = new Telegram.Telegram('339111967:AAGUe5SMy6yRrtGxlrs8pp30CwzY0836zyo', {
  workers: 1
})

tg.router.when(new Telegram.TextCommand('/add', 'addCommand'), todoController)
  .when(new Telegram.TextCommand('/get', 'getCommand'), todoController)
  .when(new Telegram.TextCommand('/check', 'checkCommand'), todoController)
  .otherwise(new OtherwiseController() )
