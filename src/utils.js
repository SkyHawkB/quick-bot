/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/main/master/class/Collection|Discord.JS Documentation}
 */
/**
 * Iterate over a {@link https://discord.js.org/#/docs/main/master/class/Collection|Discord.JS Collection},
 * calling a callback for each value in the collection.
 *
 * @param {Collection} collection - The collection to iterate.
 * @param {Function} callback - The callback to call with each value (1 argument).
 */
module.exports.iterateCollection = (collection, callback) => {
  for(const i in collection.keyArray()) {
    const value = collection.get(collection.keyArray()[i]);

    callback(value); // eslint-disable-line callback-return
  }
};
