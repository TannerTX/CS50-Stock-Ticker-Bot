const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")
const funcs = require("./functions.js")
const fs = require('fs')

bot.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command, command.description, command.usage)
}



bot.on('message', message => {

    let args = message.content.split(' ')

    if(message.author.bot){return;}

    if(args[0].startsWith(config.prefix)){
        
        try{
            let commandName = args[0].toLowerCase().substring(1)

            if(commandName){
                bot.commands.get(commandName).execute(message, args, bot)
            }


        }
        catch(e){funcs.displayError(args[0], e, bot)}
    }


})



bot.login(config.bot_token)