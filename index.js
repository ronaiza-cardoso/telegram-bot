'use strict'

const Telegram              = require('telegram-node-bot')
const TodoController        = require('./controllers/todo.js')
const OtherwiseController   = require('./controllers/otherwise.js')
const { TELEGRAM_KEY }      = require('./config.js')

const todoController        = new TodoController()

const tg = new Telegram.Telegram(TELEGRAM_KEY, {
  workers: 1
})

tg.router.when(new Telegram.TextCommand('/add', 'addCommand'), todoController)
  .when(new Telegram.TextCommand('/get', 'getCommand'), todoController)
  .when(new Telegram.TextCommand('/check', 'checkCommand'), todoController)
  .otherwise(new OtherwiseController() )
