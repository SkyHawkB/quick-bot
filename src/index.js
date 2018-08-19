const Discord = require('discord.js');
const logger = require('sky-logger');
const util = require('./utils.js');

/**
 * The Discord.JS client options object type.
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions|Discord.JS Documentation}
 */

 /**
  * The callback for bot commands.
  *
  * @callback Command
  * @param {Client} client - The bot's client.
  * @param {Message} message - The message activating the command.
  * @param {Object} config - The bot's config.
  */

class Bot extends Discord.Client {
  /**
   * @param {ClientOptions} [options] - Options for the client.
   */
  constructor(prefix, config, allowDMs = false, options = {}) {
    super(options);

    this.commands = new Discord.Collection();
    this.prefix = prefix;
    this.allowDMs = allowDMs;
    this.config = config;
  }

  /**
   * Add a command to the bot's message handler.
   *
   * @param {Command} command - The command to add.
   */
  addCommand(name, command) {
    if(typeof command === 'function' && command.length === 3) {
      this.commands.set(name, command);
    } else {
      throw new TypeError(`Expected "command" to be a function with 3 arguments!`);
    }

    return this;
  }

  /**
   * Build the client and log in to Discord.
   *
   * @param {string} token - The client's token.
   */
  build(token) {
    this.on('message', (message) => {
      if(!message.guild && !this.allowDMs) return; /* No messages in DMs unless explicitly allowed. */
      if(message.author.bot) return; /* The bot will not respond to other bots. */
      if(!message.content.startsWith(this.prefix)) return; /* The message must begin with the bot's prefix. */

      const commandName = message.content.slice(this.prefix.length).trim().split(/ +/g).shift().toLowerCase();

      if(this.commands.has(commandName)) {
        try {
          this.commands.get(commandName)(this, message, this.config);
        } catch(e) {
          logger.error(`Error running command "${commandName}":`);
          logger.error('  ' + e.message);
        }
      }
    });

    return this;
  }

  login(token) {
    return new Promise((resolve, reject) => {
      super.login(token).then(() => {
        logger.success(`Connected to Discord!`);

        resolve(token);
      }).catch(error => {
        logger.error('Failed to log in to Discord:')
        logger.error('  ' + e.message);
        
        reject(error);
      });
    });
  }
}

module.exports.Bot = Bot;
module.exports.Logger = logger;
module.exports.Util = util;
