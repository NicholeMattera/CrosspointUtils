const { Command } = require('../command')
const { Audio } = require('../audioVideo')

class Mute extends Command {
    constructor(path, output, type) {
        super(path)
        this.output = output
        this.type = type

        if (!this.validate()) {
            process.exit(-1)
        }

        this.serialPort.write(this.output + '*1' + this.type, this.writeCallback.bind(this))
    }

    validate() {
        if (this.output === undefined) {
            console.log('[Error] Output required.')
            return false;
        }

        if (this.output < 1 || this.output > 16) {
            console.log('[Error] Invalid output.')
            return false
        }
        
        return true
    }

    writeCallback(error, bytesWritten) {
        if (error) {
            console.log('[Error] ' + error.message)
            process.exit(-2)
        }

        console.log('Output ' + this.output + ' ' + ((this.type === Audio) ? 'audio' : 'video') + ' has been muted.')
        process.exit(1)
    }
}

module.exports.Mute = Mute
