const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        var queue = 'task_queue';
        var msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queue, {
            durable: true
        });

        for (let i=0; i<10; i++){
            setTimeout(() => {
                channel.sendToQueue(queue, Buffer.from(`${msg}, ${i}`), {
                    persistent: true
                });
            }, 3000)
        }

        console.log(" [x] Sent '%s'", msg);
    });
});

