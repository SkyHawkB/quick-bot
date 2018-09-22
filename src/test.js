const {Bot} = require('./index.js');

const bot = new Bot('!', {})
  .on('ready', () => {console.log('ready')})
  .addCommand('ping', (client, message, config) => {
    message.channel.send('Pong!');
  })
  .build()
  .login(process.argv[2]);
