
const mqtt = require('mqtt');
const Device = require('../../app/models/Device');

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
            switch (topic) {
                case 'send/create':
                    const create = data.toString();
                    const createData = JSON.parse(create);
                    Device.findById(createData._id)
                        .then((device) => {
                            if (device) {
                                device.device_online = true;
                                device.save();
                            }
                        })
                    break;
                case 'send/led':
                    const led = data.toString();
                    const ledData = JSON.parse(led);
                    Device.findOne({ mac_address: ledData.mac_address, "device_status.type": ledData.device_status.type })
                        .then((device) => {
                            if (device) {
                                device.device_status.value = ledData.device_status.value;
                                device.save();
                            }
                        })
                    break;
                case 'send/dht22':
                    const dht22 = data.toString();
                    const dht22Data = JSON.parse(dht22);
                    Device.findOne({ mac_address: dht22Data.mac_address, "device_status.type": dht22Data.device_status.type })
                        .then((device) => {
                            if (device) {
                                device.device_status.value = dht22Data.device_status.value;
                                device.save();
                            }
                        })
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

let controlDeviceMqtt = (data, topic) => {
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

module.exports = { mqttconnect, pulishDeleteDevice, createDeviceMqtt, controlDeviceMqtt };
