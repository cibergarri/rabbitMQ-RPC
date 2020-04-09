const {
  connect,
  consume,
  createChannel,
  assertQueue,
  sendToQueue,
} = require('../amqp');

const  {
  fibonacci,
} = require('./fibonacci');

const rpc_queue = 'rpc_queue';

const server = async () => {
  const connection = await connect();
  const channel = await createChannel(connection);
  await assertQueue(channel, rpc_queue, { durable: false });
  channel.prefetch(1);
  console.log(' [x] Awaiting RPC requests');
  const onMessage = (msg) => {
    const n = parseInt(msg.content.toString());
    console.log(" [.] fib(%d)", n);
  
    const result = fibonacci(n);
    const response = Buffer.from(result.toString())
    const options = {
      correlationId: msg.properties.correlationId,
    };
    sendToQueue(channel, msg.properties.replyTo,response, options );
    channel.ack(msg);
  };
  consume(channel, rpc_queue, onMessage);
};

server().catch(console.warn);
