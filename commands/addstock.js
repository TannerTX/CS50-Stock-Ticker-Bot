const Discord = require('discord.js')
const bot = require('../index.js')
const funcs = require('../functions.js')
const request = require('request')
const sqlite = require('better-sqlite3')
const sql = new sqlite('./stockInfo.sqlite')
require('dotenv').config()


module.exports = {
    name: "addstock",
    description: "Add a stock symbol to the database",
    usage: "/addstock [symbol]",

    execute(message, args, bot){

        if(args.length > 2 || args.length < 2){
            funcs.displayCustomError("/addstock only accepts 1 argument!", bot, message.channel.id)
            return;
        }

        args[1] = args[1].toUpperCase()
        let req = `https://cloud.iexapis.com/stable/stock/${args[1]}/quote?token=${process.env.API_KEY}`

        const msgEmbed = new Discord.MessageEmbed()
            .setTimestamp()

        request(req, async (error, response, body) => {

            if(error){funcs.displayCustomError('Stock symbol does not exist!', bot, message.channel.id); return;}
            try{
                let responseBody = JSON.parse(body)
                msgEmbed.setTitle("Success!")
                msgEmbed.setColor('#00FF00')
                const add = sql.prepare("INSERT INTO stocks (symbol, stockname) VALUES (?, ?)").run(args[1], responseBody.companyName)
                console.log(`\n\n-------\nUpdating table with user-specified stock\n[SQL]: INSERT INTO stocks (symbol, stockname) VALUES (?, ?) with values [${args[1]}], [${responseBody.companyName}]`)
                msgEmbed.addField(`[*${responseBody.companyName}*]`, `[**${args[1]}**] Successfully added to the database!`, false)
            }
            catch(e){
                msgEmbed.setTitle('Failure!')
                msgEmbed.setColor('#FF0000')
                msgEmbed.addField("[Symbol does not exist or is already in database]", `[**${args[1]}**] has not been added to the database!`, false)}

            bot.channels.cache.get(message.channel.id).send(msgEmbed).then(msg => msg.delete({timeout: 10000}))      
        })

    }







}