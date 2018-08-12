const {Bot, Command} = require('./index.js');

const bot = new Bot()
  .setPrefix('!')
  .addCommand(new Command('ping', (client, message, config) => {
    message.channel.send('Pong!');
  }))
  .build(process.argv[2]);
