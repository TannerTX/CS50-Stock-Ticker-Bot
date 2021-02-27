# CS50 Discord Bot
 
## Introduction

> A Discord bot I made as a final project for CS50. This bot allows user(s) to add and remove stock symbols to and from a local database, then takes the specified symbols and generates a custom ticker that relays those stocks' prices within the general channel of the Discord guild in which the bot resides in. The bot utilizes API calls to [IEXCloud](https://iexcloud.io), as well as queries to a local SQLite3 database for easy data access across multiple Discord guilds.

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

