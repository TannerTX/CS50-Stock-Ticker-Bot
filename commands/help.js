const Discord = require('discord.js')
const bot = require('../index.js')
const fs = require('fs')
const functions = require('../functions.js')

module.exports = {
    name: "help",
    description: "Displays information regarding all commands and their usage(s)",
    usage: "/help",

    execute(message, args, bot){
        
        if(args.length > 1){
            functions.displayCustomError("/help doesn't take any arguments!", bot, message.channel.id)
            return;
        }

        const commands = fs.readdirSync('commands').filter(file => file.endsWith('.js'))
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle("Command Information")
            .setTimestamp()

        for(const file of commands){
            const command = require(`../commands/${file}`)
            helpEmbed.addField(`/${command.name}`, command.description, false)
        }

        bot.channels.cache.get(message.channel.id).send(helpEmbed).then(msg => msg.delete({timeout: 30000}))
    }
}