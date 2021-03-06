
const kubeMQ = require('..')

let kubeMQHost = 'localhost', kubeMQRestPort = '9090',
    clientID = 'c1', queueName = 'testQueue';

let queue = new kubeMQ.Queue(kubeMQHost, kubeMQRestPort, clientID,queueName);

let msg = new kubeMQ.QueueMessage(kubeMQ.stringToByte('body'));
//msg.addExpiration(1);

queue.send(msg).then(sent => {
    console.log('sent message:' + sent);
    deQueue();
}).catch(err => {
    console.log(err);
});

function deQueue() {
    let queueDequeue = new kubeMQ.Queue(kubeMQHost, kubeMQRestPort, clientID+'2',queueName);

    queueDequeue.receive(10, 1).then(receivedMessages => {
        console.log('received message:' + JSON.stringify(receivedMessages));
    }).catch(err => {
        console.log('error' + err)});
};

