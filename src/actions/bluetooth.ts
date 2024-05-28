import {ref} from "vue";

export let device = ref(null)
export let server = ref(null)
export let rpm = ref(0)
export let bluetoothDeviceName = ref(null)

export async function connectToBluetoothDevice() {

    try {
        console.log('Requesting Bluetooth Device...')
        device.value = await navigator.bluetooth.requestDevice({
            // acceptAllDevices: true,
            filters: [
                {services: ['00001816-0000-1000-8000-00805f9b34fb']} // Cycling Speed and Cadence service
            ],
            optionalServices: ['00001816-0000-1000-8000-00805f9b34fb'] // Cycling Speed and Cadence service
        })

        try {
            server.value = await device.value.gatt.connect()
        } catch (error) {
            console.error('Error: ', error)
        }

        bluetoothDeviceName.value = server.value.device.name

        const services = await server.value.getPrimaryServices()

        for (const service of services) {
            const characteristics = await service.getCharacteristics()

            for (const characteristic of characteristics) {
                if (characteristic.uuid === '00002a5b-0000-1000-8000-00805f9b34fb') { // CSC Measurement characteristic
                    await characteristic.startNotifications()

                    let previousCrankRevolutions = null;
                    let previousCrankTime = null;

                    characteristic.addEventListener('characteristicvaluechanged', (event) => {
                        const value = event.target.value;
                        const flags = value.getUint8(0);

                        let index = 1; // Start reading from the second byte
                        if (flags & 0x01) { // Cumulative Wheel Revolutions and Last Wheel Event Time are present
                            index += 6; // Skip these fields
                        }
                        if (flags & 0x02) { // Cumulative Crank Revolutions and Last Crank Event Time are present
                            const crankRevolutions = value.getUint16(index, true);
                            index += 2;
                            const crankTime = value.getUint16(index, true);

                            if (previousCrankRevolutions !== null && previousCrankTime !== null) {
                                const revolutions = crankRevolutions - previousCrankRevolutions;
                                const time = (crankTime - previousCrankTime) / 1024; // Convert to seconds
                                const timeInMinutes = time / 60;
                                if (timeInMinutes !== 0) { // Ensure time difference is not zero
                                    console.log('Revolutions:', revolutions, 'Time:', timeInMinutes, 'RPM:', (revolutions / timeInMinutes).toFixed(2));
                                    rpm.value = (revolutions / timeInMinutes).toFixed(2);
                                }
                            }

                            previousCrankRevolutions = crankRevolutions;
                            previousCrankTime = crankTime;
                        }
                    });
                }

            }

        }
    } catch
        (error) {
        console.error('Error: ', error)
    }
}

export function disconnectBluetoothDevice() {
    if (device.value) {
        device.value.gatt.disconnect()
        bluetoothDeviceName.value = null
        rpm.value = 0
    }
}