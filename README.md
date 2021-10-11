# Discord Stock Ticker Bot (CS50 Final Project)
 
## Description

> A Discord bot I made as a final project for CS50. This bot allows user(s) to add and remove stock symbols to and from a local database, then takes the specified symbols and generates a custom ticker that relays those stocks' prices within the general channel of the Discord guild in which the bot resides in.

>The bot utilizes API calls to [IEXCloud](https://iexcloud.io), as well as queries to a local SQLite3 database for easy data access across multiple Discord guilds.
>Users have access to a few commands that determine the bot's output. The command(s) /addstock and /removestock utilizes the better-sqlite3 node package, where they query the local database titled **StockInfo** and update the table titled **stocks**; adding and removing legitimate symbols from the table at the user's own will.

>Users also have access to /quote, /viewdb, and /ticker. /quote will make a call to the [IEXCloud](https://iexcloud.io) stock API, getting the current or latest market value of a single stock the user specifies. /viewdb allows the user to view the current contents of the **stocks** table within the **StockInfo** database. If the table is populated, a board will be posted in the main chat with all of the symbols the user has added over time. The /ticker command allows the user to toggle a forever-updating board that contains the current market value of every stock symbol in the **stocks** table. Every 10 seconds, a board is posted in the main text channel with said values; which is then deleted and replaced by a new board containing updated stock prices.

>All of these user-specified settings and stock symbols will remain persistent, even after the bot undergoes a restart- so the user will still be able
to view all of their hand-picked stocks and maintain their ticker state at all times the bot is online

## Video Demonstration
>https://www.youtube.com/watch?v=URTc0d1Osq0

>NOTE: There were some minor things I was unable to cover due to a video length limit. Not super important just FYI

## Commands
/help will give you a detailed description and usage(s) of each command. 


## Dependency Installation
```
npm install
```

## Bot Configuration
* Create an account at [IEXCloud](https://iexcloud.io) and obtain your API key (looks like *pk_....*)

* Log into the [Discord Developer Portal](https://discord.com/developers/applications)
  * Create a new application and name it whatever you'd like.
  * Navigate to the **OAuth2** tab.
  * Under **Scopes**, check the box named **bot** .
  * After checking the box, scroll further down and check the **Administrator** box.
  * Scroll back up to the **Scopes** portion and copy the newly generated link.
  * Navigate to the **Bot** tab, add a bot, name it/change it's profile photo, then copy it's token (<ins>**Never share this token**</ins>).

* Paste the **OAuth2** link into your browser, and add the bot to a server you have administrator priveleges on.

* Navigate to the root directory of the bot
  * Open the **.env** file and paste your **Bot Token** and **IEXCloud API Key** in the corresponding variables (No quotes).

## Bring the bot online
```
npm start
```
 OR
```
node index.js
```
>You can use [Heroku](https://www.heroku.com) to host the bot, but you will need to manually add the procfile and set everything up. You can find video tutorials on Youtube, or if you already know how then that's fine, too.

>I don't know if I'll continue making changes to this bot. If you have any requests, feel free to DM me on Discord (Tanner#1287) or make a pull request.
