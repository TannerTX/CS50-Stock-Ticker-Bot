const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")
const funcs = require("./functions.js")
const fs = require('fs')
const sqlite = require('better-sqlite3')
const sql = new sqlite('./stockInfo.sqlite')


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

exports.botCommands = bot.commands
//bot.login()