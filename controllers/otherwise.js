'use strict'

const Telegram = require('telegram-node-bot')

class OtherwiseController extends Telegram.TelegramBaseController {
  handle($) {
    $.sendMessage('Desculpe, eu não consigo entender')
  }
}

module.exports = OtherwiseController
