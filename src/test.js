const Bot = require('./index.js');

const bot = new Bot()
  .setPrefix('!')
  .addCommand(new Bot.Command('ping', (client, message, config) => {
    message.channel.send('Pong!');
  }))
  .build(process.argv[2]);
