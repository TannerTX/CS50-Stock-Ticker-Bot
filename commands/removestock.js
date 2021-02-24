const Discord = require('discord.js')
const bot = require('../index.js')
const request = require('request')
const sqlite = require('better-sqlite3')
const sql = new sqlite('./stockInfo.sqlite')
const funcs = require('../functions.js')
const config = require('../config.json')


module.exports = {
    name: "removestock",
    description: "Removes a specified stock from the database",
    usage: "/removestock [symbol]",

    execute(message, args, bot){

        if(args.length > 2 || args.length < 2){
            funcs.displayCustomError("/removestock only accepts 1 argument!", bot, message.channel.id)
            return;
        }

        args[1] = args[1].toUpperCase()
        const sym = sql.prepare("SELECT symbol, stockname FROM stocks WHERE symbol=?").get(args[1])
        if(!sym){funcs.displayCustomError(`**[${args[1]}]** does not exist in the database!`,bot, message.channel.id)}
        else{
            const successEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle("Success!")
            try{
                sql.prepare("DELETE FROM stocks WHERE symbol=?").run(args[1])
                successEmbed.addField("____", `[**${args[1]}**] was successfully removed from the database!`, false)
                bot.channels.cache.get(message.channel.id).send(successEmbed).then(msg => msg.delete({timeout: 10000}))
            }
            catch(e){funcs.displayCustomError("Error updating the table! Check console.", bot, message.channel.id); console.log(e)}




        }
        

    }





}