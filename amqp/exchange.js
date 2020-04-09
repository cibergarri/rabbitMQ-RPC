const { EXCHANGE_NAME } = require('../constants');

/**
 * async
 * @param {Object} channel
 * @param {String} type Exchange Type, ('fanout': mindless broadcasting, 'direct': uses routing keys, 'topic': 'uses routing with regExp')
 */
const assertExchange = async (channel, type = 'fanout') => {
  const options = { durable: false };
  const result = await channel.assertExchange(EXCHANGE_NAME, type, options);
  console.debug('Assert Exchange Result:', result);
};

/**
 * async
 * @param {Object} channel 
 * @param {String} queue queue name
 * @param {String} msg 
 */
const publishMessage = async (channel, queue, msg) => {
  const published = await channel.publish(EXCHANGE_NAME, queue, Buffer.from(msg));
  return published;
};

const bindQueue = async (channel, queue, key = '') => channel.bindQueue(queue, EXCHANGE_NAME, key);

module.exports =  {
  assertExchange,
  bindQueue,
  publishMessage,
};
