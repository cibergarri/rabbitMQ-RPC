const { NO_ACK } = require('../constants');
/**
 * async
 * @param {Object} channel
 * @param {Object} queue queue name
 * @returns {Object} queue
 */
const assertQueue = async (channel, queue, opts) => {
  const options =  opts || {};
  const result = await channel.assertQueue(queue, options);
  console.debug('Assert Queue Result:', result);
  return result;
};

/**
 * async
 * @param {Object} channel
 * @param {Object} queue queue name
 * @param {String} msg Message to be sent
 */
const sendToQueue = async (channel, queue, msg, opts) => {
  const options = opts || { persistent: true };
  const sent = await channel.sendToQueue(queue, Buffer.from(msg), options);
  console.log(" [x] Sent '%s'", msg);
  return sent;
};

const consume = async (channel, queue, onMessage, options = {}) => {
  const result = await channel.consume(queue, onMessage, options);
  console.log('channel consume result', result);
};

module.exports = {
  assertQueue,
  sendToQueue,
  consume,
};
