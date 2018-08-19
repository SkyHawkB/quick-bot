const {Bot} = require('./index.js');

const bot = new Bot('!', {})
  .addCommand('ping', (client, message, config) => {
    message.channel.send('Pong!');
  })
  .build()
  .login(process.argv[2]);
