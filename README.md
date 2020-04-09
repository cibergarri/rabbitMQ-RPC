
Fibonacci Remote Procedure call with rabbitMQ

start rabbitMQ in docker:
```
 docker run -d --name amqp.test -p 5672:5672 rabbitmq
```

Start the RPC Server:
```
npm run server
```

request one fibonacci digit:
```
npm run client 7
```
