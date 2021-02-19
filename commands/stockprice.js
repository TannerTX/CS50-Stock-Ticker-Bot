const Discord = require('discord.js')
const bot = require('../index.js')
const config = require('../config.json')
const funcs = require('../functions.js')

module.exports = {
    name: "stockprice",
    description: "Get the price of a specific Stock or Crypto",
    usage: "/stockprice [ticker]",

    execute(message, args, bot){

        if(args.length > 2 || args.length === 1){
            funcs.displayCustomError("/stockprice only accepts 1 argument!", bot)
        }

        if(message.member.roles.cache.has(config.adminID)){
             

        }
    }






}
