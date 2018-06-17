# quick-bot

A Discord bot framework with some discord.js utilities included.

## Installation

```
npm i quick-bot
```
or
```
yarn add quick-bot
```

## Usage

```js
const Bot = require('simple-bot');

const ping = new Bot.Command('ping', (client, message, config) => {
  message.channel.send('Pong!');
});

const bot = new Bot.Bot()
  .setPrefix('!')
  .addCommand(ping)
  .build('my_super_secret_token');
```

Will make a bot that responds to `!ping` with `Pong!`. Easy!
