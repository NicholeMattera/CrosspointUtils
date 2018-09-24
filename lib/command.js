const SerialPort = require('serialport')

class Command {
    constructor(path) {
        if (path === undefined) {
            console.log('[Error] Path required.')
            process.exit(-1)
        }

        this.serialPort = new SerialPort(path, {
            baudRate: 9600,
            dataBits: 8,
            parity: 'none',
            stopBits: 1
        })
    }
}

module.exports = Command
