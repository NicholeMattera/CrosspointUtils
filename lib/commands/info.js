const Command = require('../command')

class Info extends Command {
    constructor(path) {
        super(path)

        this.serialPort.write('I', this.writeCallback.bind(this))
        this.serialPort.on('readable', this.readCallback.bind(this))
    }

    writeCallback(error, bytesWritten) {
        if (error) {
            console.log('[Error] ' + error.message)
            process.exit(-2)
        }
    }

    readCallback() {
        let response = this.serialPort.read(14)
        if (response == null) {
            return
        }

        response = response.toString()
        if (this.validateResponse(response)) {
            const videoInfo = response.slice(1, 6).split('X').map((e) => parseInt(e))
            const audioInfo = response.slice(8, 13).split('X').map((e) => parseInt(e))

            console.log('Number of video inputs: ' + videoInfo[0])
            console.log('Number of video outputs: ' + videoInfo[1])
            console.log('Number of audio inputs: ' + audioInfo[0])
            console.log('Number of audio outputs: ' + audioInfo[1])
            process.exit(1)
        } else {
            console.log('[Error] Invalid response')
            process.exit(-3)
            return
        }
    }

    validateResponse(response) {
        // Expected response: "V12X08 A12X08"
        return response.match(/V\d{2}X\d{2} A\d{2}X\d{2}/g)
    }
}

module.exports = Info
