
const mqtt = require('mqtt');

var options = {
    host: 'broker.hivemq.com',
    port: 1883
}
const client = mqtt.connect(options);

async function mqttconnect() {
    try {
        client.on('connect', async () => {
            console.log('MQTT Connected');

            client.subscribe(['send/led', 'send/dht22', 'send/create']);
        })
        client.on('message', async (topic, data) => {
            // console.log("MQTT Received Topic:", topic.toString());
            switch (topic) {
                case 'send/create':
                    const create = data.toString();
                    console.log('create:', create);
                    break;
                case 'send/led':
                    const led = data.toString();
                    console.log('led:', led);
                    break;
                case 'send/dht22':
                    const dht22 = data.toString();
                    // console.log('dht22:', dht22);
                    break;
                default:
                    console.log('Unknown topic:', topic);
            }
        })

    } catch (error) {
        console.log('fallmqtt', error);
    }
}

let createDeviceMqtt = (data, topic) => {
    client.publish(topic, JSON.stringify(data))
        .then(() => {
            console.log("Publisher Successfully!");
        })
        .catch((err) => {
            throw err
        })
}

// let handlecallbackmqtt = (data) => {
//     // xu ly du lieu nhan duoc
//     firebaseController.sendPushNotification();
// }

let pulishDeleteDevice = (data) => {
    client.publish("unconnect", JSON.stringify(data))
        .then(() => {
            console.log("Successfully pulish")
        })
        .catch((err) => {
            throw err
        })
}

module.exports = { mqttconnect, pulishDeleteDevice, createDeviceMqtt };
