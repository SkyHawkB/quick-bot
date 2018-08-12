const Discord = require('discord.js');
const logger = require('sky-logger');

/**
 * The Discord.JS client options object type.
 * @external ClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions|Discord.JS Documentation}
 */

class Bot {
  /**
   * @param {ClientOptions} [options] - Options for the client.
   */
  constructor(options = {}) {
    this.client = new Discord.Client();
    this.commands = [];
    this.prefix = null;
    this.allowDMs = false;
    this.config = null;
  }

  /**
   * Set the bot's prefix.
   *
   * @param {string} prefix - The new prefix.
   */
  setPrefix(prefix) {
    this.prefix = prefix;

    return this;
  }

  /**
   * Enable commands in DMs.
   */
  allowDMs() {
    this.allowDMs = true;
  }

  /**
   * Add an event to the bot manually.
   *
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The callback function.
   */
  on(eventName, callback) {
    this.client.on(eventName, listener);

    return this;
  }

  /**
   * Set the client's config, to be referenced in commands.
   *
   * @param {Object} config - The config object.
   */
  setConfig(config) {
    this.config = config;

    return this;
  }

  /**
   * Add a command to the bot's message handler.
   *
   * @param {Command} command - The command to add.
   */
  addCommand(command) {
    if(command instanceof Command) {
      this.commands.push(command);
    } else {
      throw new TypeError(`Expected "command" to be a Command!`);
    }

    return this;
  }

  /**
   * Build the client and log in to Discord.
   *
   * @param {string} token - The client's token.
   */
  build(token) {
    if(this.prefix === null) {
      throw new Error('You must set the bot\'s prefix!');
    }

    this.client.on('message', (message) => {
      if(!message.guild && !this.allowDMs) return; /* No messages in DMs unless explicitly allowed. */
      if(message.author.bot) return; /* The bot will not respond to other bots. */
      if(!message.content.startsWith(this.prefix)) return; /* The message must begin with the bot's prefix. */

      const commandName = message.content.slice(this.prefix.length).trim().split(/ +/g).shift().toLowerCase();

      for(let i in this.commands) {
        if(this.commands[i].name === commandName) {
          this.commands[i].run(this.client, message, this.config);
        }
      }
    });

    this.client.login(token).then(() => {
      logger.success(`Connected to Discord!`);
    }).catch((e) => {
      logger.error('Failed to log in to Discord:')
      logger.error('  ' + e.message);
    });
  }
}
class Command {
  /**
   * The callback for bot commands.
   *
   * @callback Command~RunFunction
   * @param {Client} client - The bot's client.
   * @param {Message} message - The message activating the command.
   * @param {Object} config - The bot's config.
   */

  /**
   * @param {string} name - The command's name.
   * @param {Command~RunFunction} onRun - The function to execute when this command is run.
   */
  constructor(name, onRun) {
    this.name = name;
    if(typeof onRun === 'function') {
      this.run = onRun;
    } else {
      throw new TypeError(`Expected "run" to be a Function!`);
    }
  }
}

module.exports.Bot = Bot;
module.exports.Command = Command;
