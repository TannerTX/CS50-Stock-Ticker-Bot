const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")
const funcs = require("./functions.js")
const fs = require('fs')
require('dotenv').config()
const sqlite = require('better-sqlite3')
const sql = new sqlite('./stockInfo.sqlite')
const request = require('request')
const yahooStockPrices = require('yahoo-stock-prices')


bot.once('ready', ()=>{
    try{
    bot.commands = new Discord.Collection()
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

    for(const file of commandFiles){
        const command = require(`./commands/${file}`)
        bot.commands.set(command.name, command, command.description, command.usage)
        console.log(`${command.name}.js successfully loaded!`)}
    }
    catch(e){funcs.displayError(e, bot); console.log('Error Loading Commands!')}

    try{
    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='stocks';").get()
    if(!table['count(*)']){sql.prepare("CREATE TABLE stocks (symbol STRING NOT NULL UNIQUE, stockname STRING NOT NULL UNIQUE, PRIMARY KEY (symbol))").run()}
    }
    catch(e){funcs.displayError(e, bot); console.log('Error within SQL table!')}
})


bot.on('message', message => {

    let args = message.content.split(' ')
    if(message.author.bot){return;}
    if(args[0].startsWith(config.prefix)){
        try{
            let commandName = args[0].toLowerCase().substring(1)
            if(commandName){bot.commands.get(commandName).execute(message, args, bot)}
        }catch(e){funcs.displayError(e, bot)}}
    })


setInterval(async () => {  
    let count = 0
    const db = sql.prepare("SELECT symbol FROM stocks")

    for(const ct of db.iterate()){count++}
    if(count < 1){console.log("Not posting, no table values"); return;}
    else{
        const ticker = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle("Tickers")
            .setTimestamp()

        for(const val of db.iterate()){
            var stock = await yahooStockPrices.getCurrentData(val.symbol)
            ticker.addField(val.symbol, `$${stock.price}`, false)
        }
        bot.channels.cache.get('811835844691755032').send(ticker).then(msg => msg.delete({timeout: 15000}))
    }
}, 15000)

exports.botCommands = bot.commands
bot.login(process.env.TOKEN)