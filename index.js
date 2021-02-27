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

bot.once('guildCreate', (guild) => {
    const channel = guild.channels.cache.find((c) => c.type === "text" && c.permissionsFor(guild.me).has("SEND_MESSAGES"))
    const joinEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor('#0000ff')
        .setTitle("Thanks for the invite!")
        .setDescription("I'm just a simple stock ticker bot that relays current stock prices into your general chat!")
        .setAuthor("DontWorryAbout",'https://avatars.githubusercontent.com/u/26658944?s=460&u=900e96b6e426414ccfd45b848b8792da3517938a&v=4','https://github.com/DontWorryAbout')
        
       

    if(channel){
        let content = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
        if(content.defaultChanID == ""){
            content.defaultChanID = channel.id
            fs.writeFileSync('./config.json', JSON.stringify(content))
        }
        bot.channels.cache.get(content.defaultChanID).send(joinEmbed).then(msg => msg.delete({timeout: 30000}))}
    else{return;}
})

bot.once('ready', ()=>{

    bot.user.setActivity("/help")

    try{
        bot.commands = new Discord.Collection()
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

        for(const file of commandFiles){
            const command = require(`./commands/${file}`)
            bot.commands.set(command.name, command, command.description, command.usage)
            console.log(`${command.name}.js successfully loaded!`)
        }

    }catch(e){funcs.displayError(e, bot); console.log('Error Loading Commands!')}

    try{
        const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='stocks';").get()
        console.log("\n\n-------\nChecking if a database already exists:")
        console.log("-------\n[SQL]: SELECT count(*) FROM sqlite_master WHERE type='table' AND name='stocks'")

        if(!table['count(*)']){
            console.log("-------\nTable does not exist! Creating new table named stocks")
            sql.prepare("CREATE TABLE stocks (symbol STRING NOT NULL UNIQUE, stockname STRING NOT NULL UNIQUE, PRIMARY KEY (symbol))").run()
            console.log("[SQL]: CREATE TABLE stocks (symbol STRING NOT NULL UNIQUE, stockname STRING NOT NULL UNIQUE, PRIMARY KEY (symbol))")}
        else{console.log("-------\nStocks table exists!")}

    }catch(e){funcs.displayError(e, bot); console.log('Error within SQL table!')}
  
})

bot.on('message', message => {

    let args = message.content.split(' ')
    if(message.author.bot){return;}
    if(args[0].startsWith(config.prefix)){
        try{
            let commandName = args[0].toLowerCase().substring(1)
            if(commandName){bot.commands.get(commandName).execute(message, args, bot); message.delete({timeout: 5000})}
        }catch(e){funcs.displayCustomError("Command does not exist!\nUse /help for a list of usable commands.", bot, message.channel.id)}}
    })

setInterval(async () => {  
    let content = JSON.parse(fs.readFileSync("../config.json", 'utf8'))
    
    if(content.tickerStatus == "on"){

    let count = 0
    const db = sql.prepare("SELECT symbol FROM stocks")

    for(const ct of db.iterate()){count++}
    if(count < 1){return;}
    else{
        const ticker = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle("Tickers")
            .setTimestamp()

        for(const val of db.iterate()){
            var stock = await yahooStockPrices.getCurrentData(val.symbol)
            ticker.addField(val.symbol, `$${stock.price}`, false)
        }
        bot.channels.cache.get(config.defaultChanID).send(ticker).then(msg => msg.delete({timeout: 15000}))
    }
}

}, 15000)


bot.login(process.env.TOKEN)