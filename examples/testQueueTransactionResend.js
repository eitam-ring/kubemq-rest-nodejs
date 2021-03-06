const kubeMQ = require('..')


let kubeMQHost = 'localhost', kubeMQRestPort = '9090',
    clientID = 'c1', queueName = 'testQueue';

    let transactionQueue= new kubeMQ.QueueTransaction(kubeMQHost, kubeMQRestPort, clientID, queueName);
 
transactionQueue.receiveMessage(5, 10);


transactionQueue.on('error', err => {
  if (err.IsError) {
    console.log('Error ' + err.Error);
  } else {
    console.log('Error ' + err.message);
  }
});

transactionQueue.on('end', mod => {
  console.log('end transaction by: ' + mod.by);
  //  transaction.receiveMessage(1, 10);
});
transactionQueue.addListener('extended', ack => {
  console.log(ack);
});

transactionQueue.on('message', msg => {
  console.log(msg);
  if (msg.IsError) {
    console.log('error' + msg);
    return;
  }
 
  transactionQueue.resend('newQueue');
});
   
