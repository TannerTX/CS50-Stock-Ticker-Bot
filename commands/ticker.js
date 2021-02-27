const Discord = require('discord.js')
const bot = require('../index.js')
const fs = require('fs')
const funcs = require("../functions.js")


module.exports = {
    name: "ticker",
    description: "Changes the current state of the live ticker",
    usage: "/ticker [on | off]",

    execute(message, args, bot){

        if(args.length > 2 || args.length < 2){
            funcs.displayCustomError("/ticker only accepts 1 argument!", bot, message.channel.id)
            return;
        }

        let content = JSON.parse(fs.readFileSync('../config.json', 'utf8'))

        switch(args[1].toLowerCase()){

            case "on":
                if(content.tickerStatus == "on"){
                    funcs.displayCustomError("Ticker is already on!", bot, message.channel.id)
                }
                else{
                    content.tickerStatus = "on"
                    fs.writeFileSync('../config.json', JSON.stringify(content))
                    bot.channels.cache.get(message.channel.id).send("Ticker status: [**On**]").then(msg => msg.delete({timeout: 5000}))
                }
            break;

            case "off":
                if(content.tickerStatus == "off"){
                    funcs.displayCustomError("Ticker is already off!", bot, message.channel.id)
                }
                else{
                    content.tickerStatus = "off"
                    fs.writeFileSync('../config.json', JSON.stringify(content))
                    bot.channels.cache.get(message.channel.id).send("Ticker status: [**Off**]").then(msg => msg.delete({timeout: 5000}))
                }
            break;

            default:
                funcs.displayCustomError("Only accepted arguments: [on | off]", bot, message.channel.id);
            break;
        }




    }

}