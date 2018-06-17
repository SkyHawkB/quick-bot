const Discord = require('discord.js');
const logger = require('sky-logger');

class Command {
  /**
   * @param {string} name - The command's name.
   */
  constructor(name) {
    this.name = name;
    this.run = () =>  {
      logger.info(`No run function specified for the "${this.name}" command.`);
    };
  }

  /**
   * The callback for bot commands.
   *
   * @callback Command~RunFunction
   * @param {Client} client
   * @param {Message} message
   * @param {Object} config
   */

  /**
   * Set the function to execute when this command is run.
   *
   * @param {Command~RunFunction} callback - The function to run.
   */
  onRun(callback) {
    if(typeof callback == 'function') {
      this.run = callback;
    } else {
      throw new TypeError(`Expected "onRun" to be a Function!`);
    }

    return this;
  }
}

class Bot {
  /**
   * @param {ClientOptions} [options] - Options for the client.
   */
  constructor(options = {}) {
    this.client = new Discord.Client();
    this.commands = [];
    this.config = null;
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
    this.client.on('message', (message) => {
      logger.debug('Message recieved!');
    });

    this.client.login(token).then(() => {
      logger.success(`Connected to Discord!`);
    });
  }
}

module.exports.Bot = Bot;
module.exports.Command = Command;
