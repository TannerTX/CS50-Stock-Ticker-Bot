const Discord = require('discord.js')
const bot = require('./index.js')
const request = require('request')
const sqlite = require('better-sqlite3')
const sql = new sqlite('./stockInfo.sqlite')
const config = require('./config.json')


module.exports = {

    displayError: function(err, bot){
        
        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error!')
            .addField("READ", "Bot encountered an error.\nRefer to the console for more information.", false)
            .setTimestamp()

        bot.channels.cache.get('811835844691755032').send(errorEmbed).then(msg => msg.delete({timeout: 10000}))
        console.log(err)
        return;
    },

    displayCustomError: function(message, bot, chanid){
        const customErrorEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Error!')
            .addField("READ", `${message}`, false)
            .setTimestamp()
        
        bot.channels.cache.get(chanid).send(customErrorEmbed).then(msg => msg.delete({timeout: 10000}))
        return
    }
        
}