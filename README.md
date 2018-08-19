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
const {Bot} = require('quick-bot');

const client = new Bot('!', {})
  .addCommand('ping', (client, message, config) => {
    message.channel.send('Pong!');
  })
  .build()
  .login('TOKEN HERE');
```

Will make a bot that responds to `!ping` with `Pong!`. Easy!

## Docs

The full documentation can be found [here](https://skyhawkb.github.io/quick-bot).
