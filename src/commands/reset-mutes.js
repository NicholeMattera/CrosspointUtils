const { Command } = require('../command')

class ResetMutes extends Command {
    constructor(path) {
        super(path)
        this.serialPort.write('\x1BZZ\r', this.writeCallback.bind(this))
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
        if (response.startsWith('Zpz')) {
            console.log('All video and audio mutes have been reset.')
            process.exit(1)
        } else {
            console.log('[Error] Invalid response.')
            process.exit(-3)
            return
        }
    }
}

module.exports.ResetMutes = ResetMutes
