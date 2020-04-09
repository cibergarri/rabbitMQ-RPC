const uuid = require('uuid');
const {
  connect,
  consume,
  createChannel,
  assertQueue,
  sendToQueue,
} = require('../amqp');

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: npm run client num");
  process.exit(1);
}

const onMessage = (connection, correlationId) => (msg) => {
  if (msg.properties.correlationId == correlationId) {
    console.log(' [.] Got %s', msg.content.toString());
    setTimeout(function() { 
      connection.close(); 
      process.exit(0) 
    }, 500);
  }
};


const request = async () => {
  const connection = await connect();
  const channel = await createChannel(connection);
  const queueObj = await assertQueue(channel, '', { exclusive: true });
  const { queue } = queueObj;

  const correlationId = uuid.v1();
  const num = parseInt(args[0]);

  console.log(' [x] Requesting fib(%d)', num);

  
  await consume(channel, queue, onMessage(connection, correlationId), { noAck: true });
  
  const reuestMsg = Buffer.from(num.toString());
  const options ={ 
    correlationId: correlationId, 
    replyTo: queue,
  }
  sendToQueue(channel, 'rpc_queue', reuestMsg, options );
}

request().catch(console.warn);
