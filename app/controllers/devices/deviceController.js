import mqtt from "../../../config/mqtt";

let publisherCreateDevice = (device, topic) => {
    try {
        const data = {
            action: "create",
            device_owner: device.device_owner,
            home_id: device.home_id,
            device_status: device.device_status,
            _id: device._id
        };
        mqtt.createDeviceMqtt(data, topic);
    } catch (error) {
        return error;
    }
}

let publisherControlDevice = (device, topic) => {
    try {
        const data = {
            action: "control",
            device_owner: device.device_owner,
            home_id: device.home_id,
            device_status: device.device_status,
        };
        mqtt.controlDeviceMqtt(data, topic);
    } catch (error) {
        return error;
    }
}

let publisherDeleteDevice = (device, topic) => {
    try {
        const data = {
            action: "delete",
            device_owner: device.device_owner,
            home_id: device.home_id,
        };
        mqtt.deleteDeviceMqtt(data, topic);
    } catch (error) {
        return error;
    }
}

module.exports = {
    publisherCreateDevice,
    publisherControlDevice,
    publisherDeleteDevice
}
