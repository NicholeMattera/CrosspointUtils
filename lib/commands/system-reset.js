const Command = require('../command')

class SystemReset extends Command {
    constructor(path) {
        super(path)
        this.serialPort.write('\x1BZXXX\r', this.writeCallback.bind(this))
        this.serialPort.on('readable', this.readCallback.bind(this))
    }

    writeCallback(error, bytesWritten) {
        if (error) {
            console.log('[Error] ' + error.message)
            process.exit(-2)
        }
    }

    readCallback() {
        let response = this.serialPort.read(3)
        if (response == null) {
            return
        }

        response = response.toString()
        if (response.startsWith('Zpx')) {
            console.log('System has been reset. All settings are back to factory default.')
            process.exit(1)
        } else {
            console.log('[Error] Invalid response.')
            process.exit(-3)
            return
        }
    }
}

module.exports = SystemReset
