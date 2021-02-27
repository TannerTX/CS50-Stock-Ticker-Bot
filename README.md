# CS50 Discord Bot
 
## TODO

> A Stock Ticker Discord bot written as a final project for CS50

## Code Samples
```Javascript
Test
```


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

