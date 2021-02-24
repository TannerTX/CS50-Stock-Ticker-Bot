const Discord = require('discord.js')
const bot = require('../index.js')
const funcs = require("../functions.js")
const sqlite = require('better-sqlite3')
const sql = new sqlite('./stockInfo.sqlite')


module.exports = {
    name: "viewdb",
    description: "View the contents of the current database",
    usage: "/viewdb",

    execute(message, args, bot){

        if(args.length > 1){
            funcs.displayCustomError("/viewdb doesn't take any arguments!", bot)
            return;
        }

        let count = 0
        const table = sql.prepare("SELECT symbol, stockname FROM stocks")
        for(const ct of table.iterate()){count++}

        if(count < 1){funcs.displayCustomError("Database is not populated!", bot, message.channel.id)}
        else{
        const dbEmbed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTimestamp()
            .setTitle("Current Symbols in Database")

        try{
            for(const val of table.iterate()){
                dbEmbed.addField(val.symbol, `*${val.stockname}*`, false)
            }
            bot.channels.cache.get(message.channel.id).send(dbEmbed).then(msg => msg.delete({timeout: 25000}))
        }
        catch(e){funcs.displayError(e, bot)}
      }
    }
}