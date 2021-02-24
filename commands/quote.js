const Discord = require('discord.js')
const bot = require('../index.js')
const funcs = require('../functions.js')
const request = require('request')
const config = require('../config.json')


module.exports = {
    name: 'quote',
    description: 'Get a quote for a specific stock',
    usage: '/quote [symbol]',

    execute(message, args, bot){

        if(args.length > 2 || args.length < 2){
            funcs.displayCustomError("/quote only accepts 1 argument!", bot, message.channel.id)
            return;
        }
        
        args[1] = args[1].toUpperCase()
        let req = `https://cloud.iexapis.com/stable/stock/${args[1]}/quote?token=${config.API_KEY}`
        const tickerEmbed = new Discord.MessageEmbed()
            .setColor('#34b7eb')
            .setTitle(`Quote for ${args[1]}`)
            .setTimestamp()

        request(req, async (error, response, body) => {

            if(error){funcs.displayCustomError('Stock symbol does not exist!', bot, message.channel.id); return;}

            try{
            let responseBody = JSON.parse(body)
            tickerEmbed.addField(`[*${responseBody.companyName}*]`, `$ **${responseBody.latestPrice}**`, false)
            bot.channels.cache.get(message.channel.id).send(tickerEmbed).then(msg=>msg.delete({timeout: 15000}))
            }
            catch(e){funcs.displayCustomError("Symbol does not exist!", bot, message.channel.id)}
            
        })
    
    

    }





}