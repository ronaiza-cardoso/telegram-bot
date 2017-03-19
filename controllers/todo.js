'use strict'

const Telegram = require('telegram-node-bot')

class TodoController extends Telegram.TelegramBaseController {
  addHandler($) {
    let todo = $.message.text.split(' ').slice(1).join()
    if (!todo) {
      return $.sendMessage('Por favor, adicione um item a sua lista.')
    }

    $.getUserSession('todos')
      .then(todos => {
        if (!Array.isArray(todos)) {
          $.setUserSession('todos', [todo])
        } else {
          $.setUserSession('todos', todos.concat([todo]))
        }
        $.sendMessage('Item adicionado à lista')
      })
  }

  getHandler($) {
    $.getUserSession('todos')
      .then(todos => {
        $.sendMessage(this._serializeList(todos), { parse_mode: 'Markdown'})
      })
  }

  checkHandler($){
    let index = parseInt($.message.text.split(' ').slice(1)[0])
    if (isNaN(index)) {
      return $.sendMessage('Esse item não existe, por favor entre com um válido.')
    }

    $.getUserSession('todos')
      .then(todos => {
        $.sendMessage(`O item *${todos[index]}* foi retirado da sua lista.`, { parse_mode: 'Markdown' })
        todos.splice(index, i)
      })
  }

  get routes() {
    return {
      addCommand:   'addHandler',
      getCommand:   'getHandler',
      checkCommand: 'checkHandler'
    }
  }

  _serializeList(todoList) {
    let serialized = '*Sua lista:*\n\n'

    todoList.forEach((items, index) => {
      serialized += `*${index}* - ${items}\n`
    })
    return serialized;
  }

}

module.exports = TodoController
